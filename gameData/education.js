module.exports = [
  {
    title: 'elementary',
    startingAge: 5,
    endingAge: 10,
    costMin: undefined,
    costMax: undefined,
    options: undefined,
    intelligence: {
      normalMin: 2,
      normalMax: 6,
      bonusMin: 4,
      bonusMax: 7
    }
  },
  {
    title: 'middle school',
    startingAge: 10,
    endingAge: 14,
    costMin: undefined,
    costMax: undefined,
    options: undefined,
    intelligence: {
      normalMin: 2,
      normalMax: 6,
      bonusMin: 4,
      bonusMax: 7
    }
  },
  {
    title: 'high school',
    startingAge: 14,
    endingAge: 18,
    costMin: undefined,
    costMax: undefined,
    options: undefined,
    intelligence: {
      normalMin: 2,
      normalMax: 6,
      bonusMin: 4,
      bonusMax: 7
    }
  },
  {
    title: 'college',
    startingAge: 18,
    endingAge: 21,
    costMin: 10000,
    costMax: 45000,
    options: [
      'english',
      'mathematics',
      'biology',
      'computer science',
      'business',
      'political science',
      'engineering'
    ],
    intelligence: {
      normalMin: 2,
      normalMax: 6,
      bonusMin: 4,
      bonusMax: 7
    }
  }
]