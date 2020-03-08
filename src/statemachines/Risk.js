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
      currentPlayer: 0,
      players: [],
      nextId: 1,
      lands: [],
      //Don't really like missions here, but if they are, I can paste the statechart directly into the visualizer
      missions: []
    },
    states: {
      idle: {
        on: {
          FETCH: "loading"
        }
      },
      loading: {
        on: {
          RESOLVE: {
            target: "addPlayers",
            actions: "saveLands"
          },
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
          ADD_PLAYER: {
            actions: "addPlayer"
          },
          REMOVE_PLAYER: {
            actions: "removePlayer"
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
          attack: {
            on: {
              WIN: "takeOverTerritory",
              LOOSE: "battleLost"
            }
          },
          takeOverTerritory: {},
          battleLost: {}
        }
      }
    }
  },
  {
    actions: {
      addPlayer: assign((ctx, e) => ({
        players: ctx.players.concat({
          name: e.payload.name,
          color: e.payload.color,
          troopsToPlace: 0,
          id: ctx.nextId,
          mission: null
        }),
        nextId: ctx.nextId + 1
      })),
      removePlayer: assign((ctx, e) => {
        let filtered = ctx.players.filter(pl => pl.id !== e.payload.id);
        return {
          players: filtered
        };
      }),
      setInitialTroops: assign((context, event) => {
        console.log("setInitialTroops...DONE");
        let newPlayers = context.players.map(player => {
          player.troopsToPlace = 20 + (6 - context.players.length) * 5;
          return player;
        });
        return {
          players: newPlayers
        };
      }),
      saveLands: assign((ctx, e) => {
        return {
          lands: e.data
        };
      }),
      nextPlayer: (context, event) => {
        if (context.currentPlayer + 1 === context.players.length) {
          context.currentPlayer = 0;
          return context.currentPlayer;
        }
        return (context.currentPlayer += 1);
      },
      distributeLands: (context, event) => {
        console.log("distributeLands... DONE");
        let playerCounter = 0;
        let landsCopy = [...context.lands];
        let newLands = [];
        for (let i = landsCopy.length - 1; i >= 0; i--) {
          const l = landsCopy.splice(
            Math.floor(Math.random() * landsCopy.length),
            1
          )[0];

          l.owner = context.players[playerCounter].id;
          l.troops = 1;
          newLands.push(l);
          playerCounter++;
          if (playerCounter >= context.players.length) {
            playerCounter = 0;
          }
        }
        let newPlayers = context.players.map(player => {
          const territories = context.lands.filter(l => l.owner === player.id);
          player.troopsToPlace = player.troopsToPlace - territories.length;
          return player;
        });
        return {
          players: newPlayers,
          lands: newLands
        };
      },
      setMissions: (context, event) => {
        console.log("setMissions... overwrite me");
      }
    }
  }
);
export default RISKMachine;
