module.exports = [
  {
    name: 'Flu',
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
    name: 'Fever',
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
    name: 'Depression',
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