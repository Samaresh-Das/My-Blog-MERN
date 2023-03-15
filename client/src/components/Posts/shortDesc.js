import DOMPurify from "dompurify";

const Max_Length_Of_Description = 100;

export const shortingDesc = (description) => {
  const sanitizedDescription = DOMPurify.sanitize(description);
  const div = document.createElement("div");
  div.innerHTML = sanitizedDescription;
  const textContent = div.textContent || div.innerText || "";
  const shortDescription =
    textContent.length > Max_Length_Of_Description
      ? textContent.slice(0, Max_Length_Of_Description) + "..."
      : textContent;

  return { shortDescription, Max_Length_Of_Description, textContent };
};
