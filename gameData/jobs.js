module.exports = [
  {
    title: 'sr artist',
    minimumSalary: 5000,
    maximumSalary: 25000,
    requiredEducation: 'high school',
    requiredExperience: {
      years: 3,
      title: 'artist' 
    },
    promotion: 'sr artist'
  },
  {
    title: 'artist',
    minimumSalary: 5000,
    maximumSalary: 25000,
    requiredEducation: 'high school',
    requiredExperience: undefined,
    promotion: 'sr artist'
  },
  {
    title: 'sr journalist',
    minimumSalary: 32500,
    maximumSalary: 45000,
    requiredEducation: 'high school',
    requiredExperience: {
      years: 2,
      title: 'journalist' 
    },
    promotion: undefined
  },
  {
    title: 'journalist',
    minimumSalary: 15000,
    maximumSalary: 30000,
    requiredEducation: 'high school',
    requiredExperience: undefined,
    promotion: 'sr journalist'
  },
  {
    title: 'sr programmer',
    minimumSalary: 20000,
    maximumSalary: 45000,
    requiredEducation: 'computer science',
    requiredExperience: {
      years: 5,
      title: 'programmer' 
    },
    promotion: undefined
  },
  {
    title: 'programmer',
    minimumSalary: 20000,
    maximumSalary: 45000,
    requiredEducation: 'computer science',
    requiredExperience: {
      years: 2,
      title: 'jr programmer' 
    },
    promotion: 'sr programmer'
  },
  {
   title: 'jr programmer',
   minimumSalary: 10000,
   maximumSalary: 20000,
   requiredEducation: 'computer science',
   requiredExperience: undefined,
   promotion: 'programmer'
 },
//  {
//    title: '',
//    minimumSalary: ,
//    maximumSalary: ,
//    requiredEducation: '',
//    requiredExperience: {
//      years: ,
//      title: '' 
//    },
//    promotion: ''
//  },
  
]