class Character {
  constructor(options) {
    this.name = options.name,
    this.surname = options.surname,
    this.age = options.age || 1,
    this.money = options.money || 0,
    this.health = options.health || 50,
    this.looks = options.looks || 50
    this.happiness = options.looks || 0,
    this.origin = options.nationality || 'england'
    this.location = options.location || 'london'
    this.intelligence = options.intelligence || 50
    this.gender = options.gender || 'male'
    this.education = options.education || [] 
  }
} 

module.exports = Character;
