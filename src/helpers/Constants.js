export const globalStateSchema = {

    user:{
        name: "",
        email: "",
        towerAccess: false,
        rol: "",
        inventory: [],
        characterStats: {
            hp: 100,
            strength: 0,
            agility: 0,
            intelligence: 0
        },
        characterMaxStats: {
            maxHp: 100,
            maxStrength: 0,
            maxAgility: 0,
            maxIntelligence: 0
        },
        diseases: {
            rotting_plague: false,
            epic_weakness: false,
            marrow_apocalypse: false,
            ethazium: false,
        },
        imgURL : "",
    },

    userList: [],

    battleStart:false,

    initiative: [],
    
    currentTurn: "",

}