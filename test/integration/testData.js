module.exports = {
    registerData: {
        email: "userTest" + Math.floor((Math.random() * 100) + 1) + '@cog.com',
        phoneNumber: Number('0101111111' + Math.floor((Math.random() * 100) + 1)),
        password: 123,
        firstName: 'test',
        lastName: 'user',
        gender: 'male',
        countryCode: 'Eg',
        birthdate: '1990-12-12'
    },
    wrongData: {
        password: 123,
        firstName: 'test',
        lastName: 'user',
        gender: 'male',
        countryCode: 'Eg',
        birthdate: '2050-12-12'
    },
    statusData:{
        name : "testStatus"
    }
}