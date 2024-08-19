This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


*Any assumptions or design decisions made
.i assume there should be another page for evaluation so i created another route for it because when user  clicks on the evaluate score button it should take them to evaluation  for therm to see thir scores e.g overall score,and score breakdown by criteria


*List of implemented features and bonus points
1
 .i implemented the number 1 key feature which are the following.
.Implement drag-and-drop functionality for PDF files
.i provided a manual file upload option
.Display file size limit (e.g., "Limit 25 MB per file")
.Store uploaded files using browser local storage

2
.i implented the 2nd feature which is local sorage implementation which are the following
.i Save uploaded files and their metadata locally
. also Ensure persistence of data across page reloads
. Implemented efficient retrieval of stored files and data 

3
.i implented the 3rd feature which is the coursework detail form which are the following
.Create dropdowns for "Coursework Type" and "Subject"
.Add a text input for essay title
.Store form data locally with the associated file

4
.i implented the 4th one  which is the evaluation feature whicj are the following
. i created a dummy pdf 
.also display overall score of the stuent in the pdf by extracting all the text in the pdf and getting the overall score
.also stored the evaluation results like overallScore and other in local storage
.

5
.i implented the 5th one  which is coursework list 
.by displaying the previously uploaded coursework
.also the title,subjects and word count from the pdf
.

6
.i implented the 6th one  which is explore coursework list 
.by creating a tabbed interface for different coursework categories
.also grid layout for coursework examples



One of the challenges I faced was working with PDF files in the project. Specifically, I encountered difficulties in  rendering the PDF correctly in the browser,  efficiently extracting data from PDFs, getting the overAll score of the user and some other scores and rendering pdfs from local storage.To overcome this challenge, I had to do my research and this how i got to know about pdfjs library which simplify the process of extracting text from pdf files , also used regex in searching for the overall score and other scores in the pdf . 








