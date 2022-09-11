import React from "react";

import { TitleItem, ParagraphItem } from "./styles";

const Title = ({ children }) => {
  return <TitleItem>{children}</TitleItem>;
};

const Paragraph = ({ children }) => {
  return <ParagraphItem>{children}</ParagraphItem>;
};

const Typography = () => {
  return;
};

Typography.Title = Title;
Typography.Paragraph = Paragraph;

export default Typography;
