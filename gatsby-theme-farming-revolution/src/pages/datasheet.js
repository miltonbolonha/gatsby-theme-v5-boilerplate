import React, { useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Row } from "@Components/InsertRow";
import MainTemplateWrapper from "@Slices/MainTemplateWrapper";

import NoSubsContainer from "../containers/NoSubsContainer";

import ThemeContext from "@Context/ThemeContext";

const DatasheetPage = ({ pageContext, location }) => {
  const data = useStaticQuery(graphql`
    {
      frDatasheet: allWebsiteDataXlsxDatasheet {
        group(field: { Section_fr: SELECT }) {
          edges {
            node {
              Value
              Unit
              Description_fr
              Section_fr
              Text_fr
            }
          }
          fieldValue
        }
      }
      enDatasheet: allWebsiteDataXlsxDatasheet {
        group(field: { Section_en: SELECT }) {
          edges {
            node {
              Value
              Unit
              Description_en
              Section_en
              Text_en
            }
          }
          fieldValue
        }
      }

      deDatasheet: allWebsiteDataXlsxDatasheet {
        group(field: { Section_de: SELECT }) {
          edges {
            node {
              Value
              Unit
              Description_de
              Section_de
              Text_de
            }
          }
          fieldValue
        }
      }
    }
  `);
  return (
    <ThemeContext.Consumer>
      {theme => {
        let datasheet = null;
        const enDatasheet = data.enDatasheet.group;
        const frDatasheet = data.frDatasheet.group;
        const deDatasheet = data.deDatasheet.group;
        const isFr = location.pathname.includes("/fr/");
        const isDe = location.pathname.includes("/de/");
        datasheet = isFr ? frDatasheet : isDe ? deDatasheet : enDatasheet;
        const schemaJSON = pageContext.schemaJSON;
        const datasheetStatus = schemaJSON.pagesHelper.datasheet.status;
        const datasheetPage = schemaJSON.pagesHelper.datasheet;
        const genImgsNodes = theme.bigQuery.generalImages.nodes;
        const globalSubs = schemaJSON.pagesHelper.globals;
        const sectionOneImg = genImgsNodes.filter(
          gImgs => gImgs.relativePath === "FR_Hero_Human_cropped.jpg"
        );
        const getSectionOneImg = getImage(sectionOneImg[0]);
        return (
          <MainTemplateWrapper
            opt={{
              globalSubs: globalSubs,
            }}
          >
            <Row opt={{ isBoxed: false, bgColor: "#fff" }}>
              <Row opt={{ classes: "datasheet-header", isBoxed: true }}>
                <h1>
                  {datasheetPage.title ||
                    globalSubs.datasheet + " " + schemaJSON.brandShortName}
                </h1>

                <GatsbyImage
                  image={getSectionOneImg}
                  alt={"Logo"}
                  placeholder={"NONE"}
                  critical='true'
                  className={"mx-auto circle round-corners"}
                  width={890}
                  height={790}
                />
              </Row>
            </Row>
            {!datasheetStatus ? (
              <NoSubsContainer
                opt={{
                  classes: "datasheet-table",
                  toDefaultPath: "datasheet",
                }}
              />
            ) : (
              <Row
                opt={{
                  isBoxed: false,
                  bgColor: "#fff",
                }}
              >
                <Row
                  opt={{
                    classes: "datasheet-table",
                    isBoxed: true,
                  }}
                >
                  {datasheet?.map((el, ind) => {
                    return (
                      <div className='datasheet-wrapper' key={ind}>
                        <h2>{el.fieldValue}</h2>
                        <table>
                          <tbody>
                            {el?.edges?.map((e, index) => {
                              const section = isFr
                                ? e?.node?.Section_fr
                                : isDe
                                ? e?.node?.Section_de
                                : e?.node?.Section_en;
                              const desc = isFr
                                ? e?.node?.Description_fr
                                : isDe
                                ? e?.node?.Description_de
                                : e?.node?.Description_en;
                              const text = isFr
                                ? e?.node?.Text_fr
                                : isDe
                                ? e?.node?.Text_de
                                : e?.node?.Text_en;

                              const value = e?.node?.Value;
                              const unit = e?.node?.Unit;

                              return (
                                <tr key={index}>
                                  <td className='td-description'>{desc}</td>
                                  <td className='td-text'>
                                    {text ? (
                                      text
                                    ) : (
                                      <>
                                        <strong>{value}</strong> {unit}
                                      </>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    );
                  })}
                </Row>
              </Row>
            )}
          </MainTemplateWrapper>
        );
      }}
    </ThemeContext.Consumer>
  );
};

export default DatasheetPage;
