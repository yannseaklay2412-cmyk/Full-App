// src/seeders/data.jsx

export class DataStorage {

  static adminCredentials = {
    email: 'admin@dental.com',
    password: 'admin123'
  }

  static dentists = [
    {
      id: 1,
      name: 'Dr. Yoo Rii',
      title: 'Orthodontist',
      exp: '12+ years specializing in braces and aligner therapy for all ages.',
      gender: 'Female',
      about: '',
      education: '',
      specialties: [],
      schedule: ''
    },
    {
      id: 2,
      name: 'Dr. Jean Rill',
      title: 'General Dentist',
      exp: '12+ years specializing in braces and aligner therapy for all ages.',
      gender: 'Male',
      about: '',
      education: '',
      specialties: [],
      schedule: ''
    },
    {
      id: 3,
      name: 'Dr. Yeon Rill',
      title: 'Cosmetic Dentist',
      exp: '12+ years specializing in braces and aligner therapy for all ages.',
      gender: 'Female',
      about: '',
      education: '',
      specialties: [],
      schedule: ''
    },
  ]

  static users = []  // users register themselves, no seed needed
}