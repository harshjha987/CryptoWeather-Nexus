//weather types

export interface WeatherData {
    name : string,
    main : {
        temp : number,
        feels_like : number,
        temp_min : number,
        temp_max : number,
        pressure : number,
        humidity : number
    },
    weather : {
        id : number,
        main : string,
        description : string,
        icon : string
    }[]
    wind : {
        speed : number
        deg : number
    }
}

export interface WeatherHistoryData {
    dt : number
    main : {
        temp: number
        feels_like: number
        temp_min: number
        temp_max: number
        pressure: number
        humidity: number
     }
     weather : {
        id: number
        main: string
        description: string
        icon: string
     }[]
     wind: {
        speed: number
        deg: number
      }
}

//news types

export interface NewsData{
    title : string
    description : string
    url : string
    source : string
    publishedAt : string
}