interface Slide{
    id: number,
    image: string,
    title?: string,
    subtitle?: string
}

interface Project {
    name: string,
    location: string,
    area: string,
    units: string,
    rate: string,
    plotSizes: string,
    link?: string,
    image: string
}

export const slides: Slide[] = [
    {
        id: 1,
        image: "plot.jpg",
        title: "Dream Plots"
    },
    {
        id: 2,
        image: "dreamhouse.jpg",
        title: "Dream House"
    }
];


export const projects: Project[] = [
    {
        name: "Kamakshinagar",
        location: "Mangadu",
        area: "3.5 Acre",
        units: "1",
        rate: "3500/-Sqft",
        plotSizes: "600-1500",
        image: "house.jpg"
    },
    {
        name: "Parvathinagar",
        location: "Kozhimahikaram",
        area: "1 Acre",
        units: "N/A",
        rate: "3200/-Sqft",
        plotSizes: "650-1100",
        image: "house.jpg"
    },
    {
        name: "Mahalakshminagar",
        location: "Mangadu Main Road",
        area: "2 Acre",
        units: "30",
        rate: "N/A",
        plotSizes: "1200-2400",
        image: "house.jpg"
    },
    {
        name: "Parvathinagar",
        location: "Kozhimahikaram",
        area: "1 Acre",
        units: "N/A",
        rate: "3200/-Sqft",
        plotSizes: "650-1100",
        image: "house.jpg",
        link: "https://google.com"
    },
];