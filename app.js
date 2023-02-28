function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
    };
  },
  methods: {
    attackMonster() {
      const attactValue = getRandomValue(5, 12);
      this.monsterHealth -= attactValue;
      this.addLogMessage("Player", "attack", attactValue);
      this.attackPlayer();
      this.currentRound++;
    },
    attackPlayer() {
      const attactValue = getRandomValue(8, 15);
      this.playerHealth -= attactValue;
      this.addLogMessage("Monster", "attack", attactValue);
    },
    specialAttactMonster() {
      const attactValue = getRandomValue(10, 25);
      this.monsterHealth -= attactValue;
      this.addLogMessage("Player", "special-attack", attactValue);
      this.attackPlayer();
      this.currentRound++;
    },
    mayUserSpeacialAttcak() {
      return this.currentRound % 3 !== 0 || this.currentRound === 0;
    },
    healPlayer() {
      const healValue = getRandomValue(10, 25);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.addLogMessage("Player", "heal", healValue);
      this.attackPlayer();
      this.currentRound++;
    },
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.logMessages.splice(0, this.logMessages.length);
    },
    surrender() {
      this.winner = "You lost";
    },
    maySurrender() {
      return (
        this.playerHealth === 100 &&
        this.monsterHealth === 100 &&
        this.currentRound === 0
      );
    },

    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
  computed: {
    monsterBarStyle() {
      if (this.monsterHealth < 0) {
        return {
          width: "0%",
        };
      } else {
        return { width: this.monsterHealth + "%" };
      }
    },
    playerBarStyle() {
      if (this.playerHealth < 0) {
        return {
          width: "0%",
        };
      } else {
        return { width: this.playerHealth + "%" };
      }
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "Draw";
      } else if (value <= 0) {
        this.winner = "You lost";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "Draw";
      } else if (value <= 0) {
        this.winner = "You win";
      }
    },
  },
});

app.mount("#game");
