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
      labels: [],
      //Don't really like missions here, but if they are here, I can paste the statechart directly into the visualizer
      //is that really true?
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
        entry: ["generateMissions", "setMissions"],
        on: {
          ACCEPT: {
            actions: "acceptMission"
          },
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
      acceptMission: assign((ctx, e) => {
        let newPlayers = ctx.players.map(player => {
          if (player.id === e.payload.id) {
            player.mission.accepted = true;
          }
          return player;
        });
        return {
          players: newPlayers
        };
      }),
      generateMissions: assign((ctx, e) => {
        //TODO: "conquor group a & c", "own x territories" etc

        const missions = ctx.players.map(pl => {
          const mission = {
            goal: `Defeat ${pl.name}`,
            conditions: {
              type: "defeat",
              id: pl.id,
              territoryCount: 0
            }
          };
          return mission;
        });
        return {
          missions: missions
        };
      }),
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
          lands: e.lands,
          labels: e.labels
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
      setMissions: assign((context, event) => {
        console.log("setMissions... DONE");
        let missionsCopy = [...context.missions];
        const newPlayers = context.players.map(player => {
          let foundMission = false;
          while (!foundMission) {
            const index = Math.floor(Math.random() * missionsCopy.length);
            //TODO: only looks at defeat missions (only kind)
            if (player.id !== missionsCopy[index].conditions.id) {
              player.mission = missionsCopy.splice(index, 1)[0];
              player.mission.accepted = false;
              foundMission = true;
            }
          }
          return player;
        });
        return {
          players: newPlayers
        };
      })
    }
  }
);
export default RISKMachine;
