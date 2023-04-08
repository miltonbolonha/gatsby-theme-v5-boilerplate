import { useStaticQuery, graphql } from "gatsby";

export const useSiteMetadatas = () =>
  useStaticQuery(
    graphql`
      query {
        schemasJSON: allSchemasJson {
          nodes {
            locales
            schema {
              card {
                brandAppVersion
                cardLocale
                brandIntl
                brandPerson
                brandName
                brandAppName
                brandSlugName
                brandShortName
                brandPascalName
                brandDescription
                brandUrl
                brandLogo
                brandCardImage
                brandLogoTransparent
                brandPhone
                brandSeoDivisor
                brandHexMainColor
                brandHexHelperColor
                brandEmail
                brandPromoEmail
                brandGithub
                brandAppRepo
                brandHighlights
                brandPersonFamilyBio
                brandPersonBusinessHistory
                brandPersonBusinessBio
                brandTopologyDivName
                brandTopologyDivSlug
                brandVideoUrl
                brandVideoText
                datePublished
                trailingSlash
                imageMaxWidth
                imageQuality
                contentPath
                staticImagesPath
                themePath
                postPerPage
                technicalOfficer
                pagesHelper {
                  jobs {
                    mainTitle
                    tasksTitle
                    qualificationsTitle
                    firstName
                    lastName
                    email
                    phoneNumber
                    button
                    privacyPolicy
                    applyButton
                    acceptMission
                    acceptPrivacyPolicy
                    sendApplicationButton
                    applyPrintText
                    inOtherLanguages
                    formThankYou
                    genders
                  }
                  globals {
                    contactUs
                    copyright
                    footerLegend
                    imprint
                    notAvailableLocale
                    notAvailableRedirectLocale
                    openGerman
                    privacyPolicy
                    termsConditions
                    datasheet
                  }
                  datasheet {
                    status
                    title
                  }
                  index {
                    collaborations
                    foundedHistory
                    joinTeam
                    openPosition
                    sectionOneAutonomousLegend
                    sectionOneAutonomousParagraph
                    sectionOneConsumptionLegend
                    sectionOneConsumptionParagraph
                    sectionOneMainTitle
                    sectionOneSlopesLegend
                    sectionOneSlopesParagraph
                    sectionOneTrackLegend
                    starRepo
                    sectionTwoTitle
                    sectionTwoReabilityParagraph
                    sectionTwoReabilityLegend
                    sectionTwoPlantsTwoParagraph
                    sectionTwoPlantsTwoLegend
                    sectionTwoPlantsParagraph
                    sectionTwoPlantsLegend
                    sectionThreeWeedingParagraph
                    sectionThreeWeedingLegend
                    sectionThreeHerbicideParagraph
                    sectionThreeTitle
                    sectionThreeHerbicideLegend
                    sectionThreeAccuracyParagraph
                    sectionThreeAccuracyLegend
                    sectionOneTrackParagraph
                  }
                }
              }
            }
          }
        }

        brandImages: allFile(
          filter: { sourceInstanceName: { eq: "brandImages" } }
        ) {
          nodes {
            relativePath
            publicURL
            childImageSharp {
              gatsbyImageData(quality: 100)
            }
          }
        }
        generalImages: allFile(
          filter: { sourceInstanceName: { eq: "generalImages" } }
        ) {
          nodes {
            relativePath
            publicURL
            childImageSharp {
              gatsbyImageData(quality: 90)
            }
          }
        }
        pressImages: allFile(
          filter: { sourceInstanceName: { eq: "pressImages" } }
        ) {
          nodes {
            relativePath
            publicURL
            childImageSharp {
              gatsbyImageData(quality: 90)
            }
          }
        }
        darkLogo: allFile(filter: { relativePath: { eq: "logotipo.png" } }) {
          nodes {
            relativePath
            publicURL
            childImageSharp {
              gatsbyImageData(width: 250, quality: 100)
            }
          }
        }
        whiteLogoMark: allFile(
          filter: { relativePath: { eq: "F_Logo_White.png" } }
        ) {
          nodes {
            relativePath
            publicURL
            childImageSharp {
              gatsbyImageData(width: 90, height: 90, quality: 100)
            }
          }
        }

        boilerplateLogo: file(
          relativePath: { eq: "logo-fundo-transparent-900-w.png" }
        ) {
          childrenImageSharp {
            gatsbyImageData(width: 450, quality: 100)
          }
        }
        boilerplateLogoSmall: file(
          relativePath: { eq: "logo-fundo-transparent-900-w.png" }
        ) {
          childrenImageSharp {
            gatsbyImageData(width: 200, quality: 100)
          }
        }

        profileOficial: file(
          relativePath: { eq: "android-chrome-512x512.jpg" }
        ) {
          childrenImageSharp {
            gatsbyImageData(
              width: 160
              height: 160
              placeholder: NONE
              quality: 100
            )
          }
        }

        imgHolder: file(relativePath: { eq: "oval-logo.png" }) {
          childrenImageSharp {
            gatsbyImageData(
              width: 160
              height: 160
              placeholder: NONE
              quality: 100
            )
          }
        }
        cardImage: file(relativePath: { eq: "boilerplate-banner.jpg" }) {
          childrenImageSharp {
            gatsbyImageData(
              width: 1200
              height: 627
              placeholder: NONE
              quality: 85
            )
          }
        }
        githubImg: file(relativePath: { eq: "github.png" }) {
          childrenImageSharp {
            gatsbyImageData(
              width: 44
              height: 44
              placeholder: NONE
              quality: 100
              backgroundColor: "transparent"
            )
          }
        }
        instaImg: file(relativePath: { eq: "insta.png" }) {
          childrenImageSharp {
            gatsbyImageData(
              width: 44
              height: 44
              placeholder: NONE
              quality: 100
              backgroundColor: "transparent"
            )
          }
        }
        twitterImg: file(relativePath: { eq: "twitter.png" }) {
          childrenImageSharp {
            gatsbyImageData(
              width: 44
              height: 44
              placeholder: NONE
              quality: 100
              backgroundColor: "transparent"
            )
          }
        }
        whatsImg: file(relativePath: { eq: "whats.png" }) {
          childrenImageSharp {
            gatsbyImageData(
              width: 44
              height: 44
              placeholder: NONE
              quality: 100
              backgroundColor: "transparent"
            )
          }
        }

        youTubeImg: file(relativePath: { eq: "youtube.png" }) {
          childrenImageSharp {
            gatsbyImageData(
              width: 44
              height: 44
              placeholder: NONE
              quality: 100
              backgroundColor: "transparent"
            )
          }
        }
        deezerImg: file(relativePath: { eq: "deezer.png" }) {
          childrenImageSharp {
            gatsbyImageData(
              width: 44
              height: 44
              placeholder: NONE
              quality: 100
              backgroundColor: "transparent"
            )
          }
        }
        spotifyImg: file(relativePath: { eq: "spotify.png" }) {
          childrenImageSharp {
            gatsbyImageData(
              width: 44
              height: 44
              placeholder: NONE
              quality: 100
              backgroundColor: "transparent"
            )
          }
        }

        iTunesImg: file(relativePath: { eq: "itunes.png" }) {
          childrenImageSharp {
            gatsbyImageData(
              width: 44
              height: 44
              placeholder: NONE
              quality: 100
              backgroundColor: "transparent"
            )
          }
        }

        faceImg: file(relativePath: { eq: "facebook.png" }) {
          childrenImageSharp {
            gatsbyImageData(
              width: 44
              height: 44
              placeholder: NONE
              quality: 100
              backgroundColor: "transparent"
            )
          }
        }
        bannerContent: file(relativePath: { eq: "banner-content.png" }) {
          childrenImageSharp {
            gatsbyImageData(
              height: 80
              placeholder: NONE
              quality: 100
              backgroundColor: "transparent"
            )
          }
        }
        bgPatternImg: file(
          relativePath: { eq: "as-casamenteiras-PATTERN-bg.png" }
        ) {
          childrenImageSharp {
            gatsbyImageData(
              height: 107
              placeholder: NONE
              quality: 100
              backgroundColor: "transparent"
            )
          }
        }
        bandeiraFeminista: file(
          relativePath: { eq: "bandeira-feminista.png" }
        ) {
          childrenImageSharp {
            gatsbyImageData(
              width: 90
              height: 90
              placeholder: NONE
              quality: 100
            )
          }
        }
        bandeiraLgbtqia: file(relativePath: { eq: "bandeira-lgbtqia+.png" }) {
          childrenImageSharp {
            gatsbyImageData(
              width: 90
              height: 90
              placeholder: NONE
              quality: 100
            )
          }
        }
        bandeiraRibeiraoPreto: file(
          relativePath: { eq: "bandeira-ribeirao-preto.png" }
        ) {
          childrenImageSharp {
            gatsbyImageData(
              width: 90
              height: 90
              placeholder: NONE
              quality: 100
            )
          }
        }
        bandeiraVidasNegras: file(
          relativePath: { eq: "bandeira-vidas-negras.png" }
        ) {
          childrenImageSharp {
            gatsbyImageData(
              width: 90
              height: 90
              placeholder: NONE
              quality: 100
            )
          }
        }
        bandeiraCodigoAberto: file(
          relativePath: { eq: "bandeira-codigo-aberto.png" }
        ) {
          childrenImageSharp {
            gatsbyImageData(
              width: 90
              height: 90
              placeholder: NONE
              quality: 100
            )
          }
        }
        bandeiraQuestion: file(relativePath: { eq: "bandeira-pergunta.png" }) {
          childrenImageSharp {
            gatsbyImageData(
              width: 70
              height: 70
              placeholder: NONE
              quality: 100
            )
          }
        }
        bandeiraWhats: file(relativePath: { eq: "bandeira-whats.png" }) {
          childrenImageSharp {
            gatsbyImageData(
              width: 70
              height: 70
              placeholder: NONE
              quality: 100
            )
          }
        }

        treatmentImages: allFile(
          filter: { sourceInstanceName: { eq: "treatmentImages" } }
        ) {
          nodes {
            relativePath
            publicURL
            childImageSharp {
              gatsbyImageData(width: 890, height: 790, quality: 90)
            }
          }
        }
        heroImages: allFile(
          filter: { sourceInstanceName: { eq: "heroImages" } }
        ) {
          nodes {
            relativePath
            publicURL
            childImageSharp {
              gatsbyImageData(
                width: 1240
                height: 430
                quality: 100
                layout: FULL_WIDTH
              )
            }
          }
        }

        partnerImages: allFile(
          filter: { sourceInstanceName: { eq: "partnerImages" } }
        ) {
          nodes {
            relativePath
            publicURL
            childImageSharp {
              gatsbyImageData(width: 100, quality: 80)
            }
          }
        }
      }
    `
  );
