import * as React from "react";

// const pageStyles = {
//   color: "#232129",
//   padding: 96,
//   fontFamily: "-apple-system, Roboto, sans-serif, serif",
// };
// const headingStyles = {
//   marginTop: 0,
//   marginBottom: 64,
//   maxWidth: 320,
// };
// const headingAccentStyles = {
//   color: "#663399",
// };
// const paragraphStyles = {
//   marginBottom: 48,
// };
// const codeStyles = {
//   color: "#8A6534",
//   padding: 4,
//   backgroundColor: "#FFF4DB",
//   fontSize: "1.25rem",
//   borderRadius: 4,
// };
// const listStyles = {
//   marginBottom: 96,
//   paddingLeft: 0,
// };
// const listItemStyles = {
//   fontWeight: 300,
//   fontSize: 24,
//   maxWidth: 560,
//   marginBottom: 30,
// };

// const linkStyle = {
//   color: "#8954A8",
//   fontWeight: "bold",
//   fontSize: 16,
//   verticalAlign: "5%",
// };

// const docLinkStyle = {
//   ...linkStyle,
//   listStyleType: "none",
//   marginBottom: 24,
// };

// const descriptionStyle = {
//   color: "#232129",
//   fontSize: 14,
//   marginTop: 10,
//   marginBottom: 0,
//   lineHeight: 1.25,
// };

// const badgeStyle = {
//   color: "#fff",
//   backgroundColor: "#088413",
//   border: "1px solid #088413",
//   fontSize: 11,
//   fontWeight: "bold",
//   letterSpacing: 1,
//   borderRadius: 4,
//   padding: "4px 6px",
//   display: "inline-block",
//   position: "relative",
//   top: -2,
//   marginLeft: 10,
//   lineHeight: 1,
// };

const IndexPage = ({ pageContext }) => {
  const indexSubs = pageContext.schemaJSON.pagesHelper.index;
  const schemaBusiness = pageContext.schemaJSON;

  const docLink = {
    text: indexSubs.documentation,
    url: "https://www.gatsbyjs.com/docs/",
    color: "#8954A8",
  };

  const links = [
    {
      text: indexSubs.tutorialTitle,
      url: "https://www.gatsbyjs.com/docs/tutorial/",
      description: indexSubs.tutorialParagraph,
      color: "#E95800",
    },
    {
      text: indexSubs.howToGuidesTitle,
      url: "https://www.gatsbyjs.com/docs/how-to/",
      description: indexSubs.howToGuidesParagraph,
      color: "#1099A8",
    },
    {
      text: indexSubs.referenceGuideTitle,
      url: "https://www.gatsbyjs.com/docs/reference/",
      description: indexSubs.referenceGuideParagraph,
      color: "#BC027F",
    },
    {
      text: indexSubs.conceptualGuidesTitle,
      url: "https://www.gatsbyjs.com/docs/conceptual/",
      description: indexSubs.conceptualGuidesParagraph,
      color: "#0D96F2",
    },
    {
      text: indexSubs.pluginLibraryTitle,
      url: "https://www.gatsbyjs.com/plugins",
      description: indexSubs.pluginLibraryParagraph,
      color: "#8EB814",
    },
    {
      text: indexSubs.buildHostTitle,
      url: "https://www.gatsbyjs.com/cloud",
      badge: true,
      description: indexSubs.buildHostParagraph,
      color: "#663399",
    },
  ];
  console.log("pageContext");
  console.log(pageContext);
  return (
    <>
      <main className={"pageStyles"}>
        <h1 className={"headingStyles"}>
          {indexSubs.mainTitle}
          <br />
          <span className={"headingAccentStyles"}>{indexSubs.secondTitle}</span>
        </h1>
        <p className={"paragraphStyles"}>{indexSubs.secondTitle}</p>
        <ul className={"listStyles"}>
          <li className={"docLinkStyle"}>
            <a
              className={"linkStyle"}
              href={`${docLink.url}?utm_source=starter&utm_medium=start-page&utm_campaign=minimal-starter`}
            >
              {docLink.text}
            </a>
          </li>
          {links.map(link => (
            <li
              key={link.url}
              className='listItemStyles'
              style={{ color: link.color }}
            >
              <span>
                <a
                  className={"linkStyle"}
                  href={`${link.url}?utm_source=starter&utm_medium=start-page&utm_campaign=minimal-starter`}
                >
                  {link.text}
                </a>
                {link.badge && (
                  <span className={"badgeStyle"} aria-label='New Badge'>
                    {indexSubs.buildHostBadge}
                  </span>
                )}
                <p className={"descriptionStyle"}>{link.description}</p>
              </span>
            </li>
          ))}
        </ul>
        <img
          alt='Gatsby G Logo'
          src="data:image/svg+xml,%3Csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 2a10 10 0 110 20 10 10 0 010-20zm0 2c-3.73 0-6.86 2.55-7.75 6L14 19.75c3.45-.89 6-4.02 6-7.75h-5.25v1.5h3.45a6.37 6.37 0 01-3.89 4.44L6.06 9.69C7 7.31 9.3 5.63 12 5.63c2.13 0 4 1.04 5.18 2.65l1.23-1.06A7.959 7.959 0 0012 4zm-8 8a8 8 0 008 8c.04 0 .09 0-8-8z' fill='%23639'/%3E%3C/svg%3E"
        />
        <a
          href={schemaBusiness.brandAppRepo}
          rel='nofollow'
          className={"badgeStyle"}
          aria-label='Github Star this repo'
          target={"_blank"}
        >
          {indexSubs.starRepo}
        </a>
      </main>
    </>
  );
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;
