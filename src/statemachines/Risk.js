import { Machine, assign } from "xstate";
//https://xstate.js.org/viz/?gist=59bb05125d71ef524112cfb7870f4724
// Available variables:
// - Machine
// - interpret
// - assign
// - send
// - sendParent
// - spawn
// - raise
// - actions
// - XState (all XState exports)

const RISKMachine = Machine(
  {
    id: "risk",
    initial: "idle",
    context: {
      retries: 0,
      numPlayers: 2,
      currentPlayer: 0
    },
    states: {
      idle: {
        exit: ["idleExit"],
        on: {
          FETCH: "loading"
        }
      },
      loading: {
        exit: ["loadingExit"],
        on: {
          RESOLVE: "addPlayers",
          REJECT: "failure"
        }
      },
      failure: {
        on: {
          RETRY: {
            target: "loading",
            actions: assign({
              retries: (context, event) => context.retries + 1
            })
          }
        }
      },
      addPlayers: {
        exit: ["setInitialTroops", "distributeLands"],
        on: {
          ADD: {
            target: "addPlayers",
            internal: true,
            actions: assign({
              numPlayers: (context, event) => context.numPlayers + 1
            })
          },
          REMOVE: {
            target: "addPlayers",
            internal: true,
            actions: assign({
              numPlayers: (context, event) => context.numPlayers - 1
            })
          },
          NEXT: "getMissions"
        }
      },
      getMissions: {
        entry: ["setMissions"],
        on: {
          ACCEPT: "getMissions",
          NEXT: "placeUnits"
        }
      },
      placeUnits: {
        exit: ["nextPlayer"],
        on: {
          PLACE: "placeUnits",
          NEXT: "playerStartTurn"
        }
      },
      playerStartTurn: {
        entry: ["assignTurnUnits"],
        on: {
          PLACE: "playerStartTurn",
          NEXT: "playerTurn"
        }
      },
      playerTurn: {
        initial: "idle",
        internal: true,
        states: {
          idle: {
            on: {
              SELECT: "landSelected"
            }
          },
          landSelected: {
            on: {
              ALLOWED: "choosingTarget",
              NOT_ALLOWED: "idle"
            }
          },
          choosingTarget: {
            on: {
              OWN: "move",
              ENEMY: "attack"
            }
          },
          move: {},
          attack: {}
        }
      }
    }
  },
  {
    actions: {
      nextPlayer: (context, event) => {
        if (context.currentPlayer + 1 === context.numPlayers) {
          context.currentPlayer = 0;
          return context.currentPlayer;
        }
        return (context.currentPlayer += 1);
      },
      setInitialTroops: (context, event) => {
        console.log("setInitialTroops... overwrite me");
      },
      distributeLands: (context, event) => {
        console.log("distributeLands... overwrite me");
      },
      setMissions: (context, event) => {
        console.log("setMissions... overwrite me");
      }
    }
  }
);
export default RISKMachine;
