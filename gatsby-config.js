module.exports = {
    siteMetadata: {
        title: `akzhy`,
        siteUrl: 'http://akzhy.com/',
        description: `Hello, I am Akshay I am a web developer who is very passionate about web development and related fields. I've been into web designing since i was 15 and thats when i discovered my passion for it.I am also into a bit of graphic designing, though i am no pro at it.`,
        author: `@_akzhy`,
    },
    plugins: [
        {
            resolve: `gatsby-source-wordpress`,
            options: {
                baseUrl: `cms.akzhy.com`,
                protocol: `http`,
                hostingWPCOM: false,
                useACF: true,
            },
        },
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        `gatsby-plugin-sass`,
        `gatsby-plugin-sitemap`
        // `gatsby-plugin-offline`,
    ],
}
