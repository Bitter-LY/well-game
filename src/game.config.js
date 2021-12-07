import LinearGradient from './Style/LinearGradient.js'

export default {
  backgroundColor: new LinearGradient([
    [0, 'rgba(47, 53, 66, 0.8)'],
    [1, 'rgba(87, 96, 111, 0.8)']
  ]),
  username: {
    p1: '玩家P1',
    p2: '玩家P2'
  },
  evenText: '势均力敌',
  gameOverText: {
    text: '游戏结束',
    color: '#ED4C67',
    fontSize: 38,
    fontFamily: 'sans-serif'
  },
  grid: {
    lineWidth: 2,
    lineColor: '#ED4C67'
  },
  circle: {
    radius: 30,
    color: '#ED4C67',
    lineWidth: 4
  },
  break: {
    lineLength: 30,
    color: '#dfe4ea',
    lineWidth: 4
  }
}
