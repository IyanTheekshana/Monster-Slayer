function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
    };
  },
  methods: {
    attackMonster() {
      const attactValue = getRandomValue(5, 12);
      this.monsterHealth -= attactValue;
      that = this;

      that.attackPlayer();
    },
    attackPlayer() {
      const attactValue = getRandomValue(8, 15);
      this.playerHealth -= attactValue;
    },
  },
  computed: {
    monsterBarStyle() {
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyle() {
      return { width: this.playerHealth + "%" };
    },
  },
});

app.mount("#game");
