class Job {
  constructor(options) {
    this.title = options.title,
    this.minimumSalary = options.minimumSalary,
    this.maximumSalary = options.maximumSalary,
    this.requiredEducation = options.requiredEducation,
    this.requiredExperience = options.requiredExperience,
    this.promotion = options.promotion,
    this.salary = (Math.floor(Math.random() * (options.maximumSalary - options.minimumSalary + 1)) + options.minimumSalary + Math.random()).toFixed(2)
  }
}

module.exports = Job;
