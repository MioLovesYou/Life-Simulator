module.exports = [
  {
    name: 'flu',
    effect: {
      intelligence: 0,
      health: -6,
      looks: -1,
    },
    transferToKid: false,
    requirements: {
      health: undefined,
      looks: undefined,
      happiness: undefined
    }
  },
  { 
    name: 'fever',
    effect: {
      intelligence: 0,
      health: -2,
      looks: -1,
    },
    transferToKid: false,
    requirements: {
      health: undefined,
      looks: undefined,
      happiness: undefined
    }
  },
  { 
    name: 'depression',
    effect: {
      intelligence: -5,
      health: 0,
      looks: -1,
    },
    transferToKid: false,
    requirements: {
      health: undefined,
      looks: undefined,
      happiness: 5
    }
  },
  // { 
  //   name: '',
  //   effect: {
  //     intelligence: ,
  //     health: ,
  //     looks: ,
  //   },
  //   transferToKid: ,
  //   requirements: {
  //     health: ,
  //     looks: ,
  //     happiness: 
  //   }
  // },
  
]