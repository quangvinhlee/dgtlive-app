export default () => ({
  port: parseInt(process.env.PORT, 10) || 3001,

  game: {
    seniorTournamentId: process.env.SENIOR_TOURNAMENT_ID,
    juniorTournamentId: process.env.JUNIOR_TOURNAMENT_ID,
    delayMoves: parseInt(process.env.DELAY_MOVES, 10) || 5,
  }
});