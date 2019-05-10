class Character {
  constructor(options) {
    this.name = options.name,
    this.surname = options.surname,
    this.age = options.age || 1,
    this.money = options.money || 0,
    this.health = options.health || 50,
    this.looks = options.looks || 50
    this.happiness = options.looks || 0,
    this.origin = options.origin || 'china'
    this.location = options.location || 'england'
    this.intelligence = options.intelligence || 50
    this.gender = options.gender || 'male'
    this.education = options.education || [],
    this.currentEducation = options.currentEducation,
    this.job = options.job,
    this.jobList = options.jobList,
    this.relation = 50
  }
} 

module.exports = Character;
