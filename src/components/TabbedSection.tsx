"use client"
import React from 'react'
import TabLink from './TabLink';


interface item {
    names:string
}
const item :item[]= [
  { names: "All" },
  { names: "IA Example" },
  { names: "EE Example" },
  { names: "IO Example" },
  { names: "TOK Example" },
];
// export default function TabbedSection() {
// const handleClick= function(){

// }
//   return (
//     <div className="max-sm:grid max-sm:grid-cols-3  max-sm:grid-rows-2 md:flex items-center md:gap-x-4">
//    {item.map((item)=><TabLink item={item} key={item.names} />)}
//     </div>
//   );
// }



// components/StyledMuiTabs.tsx
// import { Tabs, Tab, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import MyCourseWork from './MyCourseWork';

// Custom styled Tab
// const CustomTab = styled(Tab)(({ theme }) => ({
//   textTransform: "none",
//   color: theme.palette.text.secondary,
//   padding: "4px 16px", // Padding for all states
//   borderRadius: "8px", // Optional: Border radius for all states
//   minWidth: "auto", // Optional: To avoid minimum width constraints
//   "&.Mui-selected": {
//     color: "#6947BF",
//     fontWeight: theme.typography.fontWeightBold,
//     backgroundColor: "white", // Optional: Custom background for active tab
//     padding: "1px 1px", // Optional: Different padding for selected state
//   },
// }));
// import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

// export  function Example() {
//   return (
//     <Tabs>
//       <TabList display="grid " gridTemplateColumns="repeat(3, 1fr)"  justifyContent="end" gap={1}>
//         <Tab
//           bg="gray.300"
//           _selected={{
//             bg: "blue.500",
//             color: "white",
//             fontWeight: "bold",
//             borderRadius: "md",
//           }}
//           _hover={{ bg: "blue.400", color: "white" }}
//         >
//           Tab 1
//         </Tab>
//         <Tab
//           bg="gray.300"
//           _selected={{
//             bg: "blue.500",
//             color: "white",
//             fontWeight: "bold",
//             borderRadius: "md",
//           }}
//           _hover={{ bg: "blue.400", color: "white" }}
//         >
//           Tab 2
//         </Tab>
//         <Tab
//           bg="gray.300"
//           _selected={{
//             bg: "blue.500",
//             color: "white",
//             fontWeight: "bold",
//             borderRadius: "md",
//           }}
//           _hover={{ bg: "blue.400", color: "white" }}
//         >
//           Tab 3
//         </Tab>
//         <Tab
//           bg="gray.300"
//           _selected={{
//             bg: "blue.500",
//             color: "white",
//             fontWeight: "bold",
//             borderRadius: "md",
//           }}
//           _hover={{ bg: "blue.400", color: "white" }}
//         >
//           Tab 3
//         </Tab>
//         <Tab
//           bg="gray.300"
//           _selected={{
//             bg: "blue.500",
//             color: "white",
//             fontWeight: "bold",
//             borderRadius: "md",
//           }}
//           _hover={{ bg: "blue.400", color: "white" }}
//         >
//           Tab 3
//         </Tab>
      
//       </TabList>
//       <TabPanels >
//         <TabPanel>Content 1</TabPanel>
//         <TabPanel>Content 2</TabPanel>
//         <TabPanel>Content 3</TabPanel>
//         <TabPanel>Content 3</TabPanel>
//         <TabPanel>Content 3</TabPanel>
//         <TabPanel>Content 3</TabPanel>
//       </TabPanels>
//         
//     </Tabs>
//   );
// }




import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

// export function MyTabs() {
//   return (
//     <div style={{ maxWidth: "600px", margin: "0 auto" }}>
//       <Tabs>
//         <TabList
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(3, 1fr)",
//             gridAutoRows: "auto",
//             gap: "10px",
//           }}
//         >
//           <Tab>Tab 1</Tab>
//           <Tab>Tab 2</Tab>
//           <Tab>Tab 3</Tab>
//           <Tab style={{ gridColumn: "span 1" }}>Tab 4</Tab>
//           <Tab style={{ gridColumn: "span 2" }}>Tab 5</Tab>
//         </TabList>

//         <TabPanel>
//           <p>Content for Tab 1</p>
//         </TabPanel>
//         <TabPanel>
//           <p>Content for Tab 2</p>
//         </TabPanel>
//         <TabPanel>
//           <p>Content for Tab 3</p>
//         </TabPanel>
//         <TabPanel>
//           <p>Content for Tab 4</p>
//         </TabPanel>
//         <TabPanel>
//           <p>Content for Tab 5</p>
//         </TabPanel>
//       </Tabs>
//     </div>
//   );
// }

// export default MyTabs;

 // Remove this line to start with default styles
// import { textDecoration } from '@chakra-ui/react';

const customTabListStyle:React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "", // Responsive layout
  gap: "10px",
  marginBottom: "1rem",
  padding: 0,
  listStyle: "none",
};

const customTabStyle: React.CSSProperties = {
  background: "lightgray",
  border: "none",
  padding: "10px",
  textAlign: "center",
  cursor: "pointer",
};

const customSelectedTabStyle = {
  background: "blue",
  color: "white",
  fontWeight: "bold",
};

// function MyTabs() {
//   return (
//     <div style={{ maxWidth: "800px", margin: "0 auto" }}>
//       <Tabs>
//         <TabList style={customTabListStyle}>
//           <Tab style={customTabStyle} selectedStyle={customSelectedTabStyle}>
//             Tab 1
//           </Tab>
//           <Tab style={customTabStyle} selectedStyle={customSelectedTabStyle}>
//             Tab 2
//           </Tab>
//           <Tab style={customTabStyle} selectedStyle={customSelectedTabStyle}>
//             Tab 3
//           </Tab>
//           <Tab style={customTabStyle} selectedStyle={customSelectedTabStyle}>
//             Tab 4
//           </Tab>
//           <Tab style={customTabStyle} selectedStyle={customSelectedTabStyle}>
//             Tab 5
//           </Tab>
//         </TabList>

//         <TabPanel>
//           <p>Content for Tab 1</p>
//         </TabPanel>
//         <TabPanel>
//           <p>Content for Tab 2</p>
//         </TabPanel>
//         <TabPanel>
//           <p>Content for Tab 3</p>
//         </TabPanel>
//         <TabPanel>
//           <p>Content for Tab 4</p>
//         </TabPanel>
//         <TabPanel>
//           <p>Content for Tab 5</p>
//         </TabPanel>
//       </Tabs>
//     </div>
//   );
// }

// export default MyTabs;


// export const MyTabs = () => {
//   const [selectedIndex, setSelectedIndex] = useState(0);

//   const customTabListStyle = {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", // Responsive layout
//     gap: "10px",
//     marginBottom: "1rem",
//     padding: 0,
//     listStyle: "none",
    
//   };

//   const customTabStyle = {
//     // Default styles for all tabs
//        display:"inline-block",
//     textDecoration:"none"
//   };

//   const customSelectedTabStyle = {
//     background: "white",
// border:"none",
//     color: "black",
//     fontWeight: "bold",
//     display:"inline-block"

//   };

//   return (
//     <Tabs
//       selectedIndex={selectedIndex}
//       onSelect={(index) => setSelectedIndex(index)}
//     >
//       <TabList style={customTabListStyle}>
//         {/* <div className='inline-block'> */}

//         <Tab
//           style={selectedIndex === 0 ? customSelectedTabStyle : customTabStyle}
//           >
//           Tab 1
//         </Tab>
//           {/* </div> */}
//           {/* <div className='inline-block'> */}

//         <Tab
//           style={selectedIndex === 1 ? customSelectedTabStyle : customTabStyle}
//           >
//           Tab 2
//         </Tab>
//           {/* </div> */}
//         <Tab
//           style={selectedIndex === 2 ? customSelectedTabStyle : customTabStyle}
//         >
//           Tab 3
//         </Tab>
//         <Tab
//           style={selectedIndex === 3 ? customSelectedTabStyle : customTabStyle}
//         >
//           Tab 4
//         </Tab>
//         <Tab
//           style={selectedIndex === 4 ? customSelectedTabStyle : customTabStyle}
//         >
//           Tab 5
//         </Tab>
//       </TabList>

//       <TabPanel>
//         <p>Content for Tab 1</p>
//       </TabPanel>
//       <TabPanel>
//         <p>Content for Tab 2</p>
//       </TabPanel>
//       <TabPanel>
//         <p>Content for Tab 3</p>
//       </TabPanel>
//       <TabPanel>
//         <p>Content for Tab 4</p>
//       </TabPanel>
//       <TabPanel>
//         <p>Content for Tab 5</p>
//       </TabPanel>
//     </Tabs>
//   );
// };

// export default MyTabs;


const MyTabs = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const defaultTabStyle = {

    padding: "10px 20px",
    cursor: "pointer",
    // Other styles for inactive tabs
  };

  const activeTabStyle = {
    ...defaultTabStyle,
    display: "inline-block",
    // Other styles for active tab
  };
    const customTabListStyle = {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", // Responsive layout
      gap: "10px",
      marginBottom: "1rem",
      padding: 0,
      listStyle: "none",

    };

  return (
    <Tabs
      selectedIndex={selectedIndex}
      onSelect={(index) => setSelectedIndex(index)}
    >
      <TabList style={customTabListStyle}>
        <Tab style={selectedIndex === 0 ? activeTabStyle : defaultTabStyle}>
          Tab 1
        </Tab>
        <Tab style={selectedIndex === 1 ? activeTabStyle : defaultTabStyle}>
          Tab 2
        </Tab>
        <Tab style={selectedIndex === 2 ? activeTabStyle : defaultTabStyle}>
          Tab 3
        </Tab>
        <Tab style={selectedIndex === 3 ? activeTabStyle : defaultTabStyle}>
          Tab 4
        </Tab>
        <Tab style={selectedIndex === 4 ? activeTabStyle : defaultTabStyle}>
          Tab 5
        </Tab>
      </TabList>
    </Tabs>
  );
};

export default MyTabs;