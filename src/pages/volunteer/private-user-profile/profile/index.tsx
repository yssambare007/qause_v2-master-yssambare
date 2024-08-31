import { Avatar, Box, Chip, Grid, Stack, Tab } from "@mui/material";
import React, { useState } from "react";
import Layout from "../../../../components/layouts/defaultPages/Index";
// import { S3Bucket } from "../../../../utils/utils";
import TabPanel from "@mui/lab/TabPanel";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";

function TabLabel(props: any) {
  return (
    <>
      {props.innerTab ? (
        <span
          className={`text-[20px] font-semibold normal-case ${
            props.active ? "text-[#f7a213]" : "text-gray-600"
          }`}
        >
          {props.children}
        </span>
      ) : props.innerInnerTab ? (
        <span
          className={`text-[20px] font-semibold normal-case ${
            props.active ? "text-black" : "text-gray-600"
          }`}
        >
          {props.children}
        </span>
      ) : (
        <span className="text-[20px] font-semibold normal-case text-[#f7a213]">
          {props.children}
        </span>
      )}
    </>
  );
}

function Profile(props: any) {
  const [value, setValue] = useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const [innerTabvalue, setInnerTabValue] = useState("1");
  const handleInnerTabChange = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setInnerTabValue(newValue);
  };
  const [innerInnerTabvalue, setInnerInnerTabValue] = useState("1");
  const handleInnerInnerTabChange = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setInnerInnerTabValue(newValue);
  };

  const innerTabStyling = {
    marginRight: "4rem",
    minHeight: "40px",
    width: "7rem",
    padding: 0,
  };

  const innerTabFocusStyling = {
    height: "fit-content",
    borderRadius: "4px",
    border: "1px solid #f7a213",
    backgroundColor: "#fbf4ea !important",
  };
  return (
    <Layout bg="#f9fafb">
      <Grid container paddingBottom={{ xl: 32 }}>
        <Grid xl={12} item>
          <div className="relative h-[300px] bg-[#253dc0] p-[42px]">
            <Grid xl={11} height="100%" item marginX={"auto"}>
              <div className="relative top-[48px] h-full rounded-xl bg-white px-3 py-6 shadow-[0_12px_20px_1px_rgba(64,64,64,0.11)]">
                <Grid container alignItems={"center"} height={"100%"}>
                  <Grid item xl={2} paddingX={{ xl: 1 }}>
                    <Avatar
                      alt="profile-image"
                      src={`/images/woman-verified.png`}
                      sx={{ width: "163px", height: "163px" }}
                    />
                  </Grid>
                  <Grid item xl={5}>
                    <div className="leading-7">
                      <h3 className="text-[1.85rem]">Umang</h3>
                      <h4 className="text-[0.9rem]">10-02-2023</h4>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </div>
        </Grid>
        <Grid xl={9} item marginTop={{ xl: 16 }} marginX="auto">
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                component={"button"}
                value={value}
                onChange={handleChange}
                centered
                TabIndicatorProps={{
                  style: { background: "#f7a213", height: "1.5px" },
                }}
                aria-label="tabs example"
              >
                <Tab
                  className="h-[70px] w-40"
                  value={"1"}
                  label={<TabLabel>My Task</TabLabel>}
                />
                <Tab
                  className="h-[70px] w-40"
                  value={"2"}
                  label={<TabLabel>About</TabLabel>}
                />
              </TabList>
            </Box>
            <TabPanel value={"1"}>
              <TabContext value={innerTabvalue}>
                <TabList
                  component={"button"}
                  value={innerTabvalue}
                  onChange={handleInnerTabChange}
                  centered
                  TabIndicatorProps={{
                    style: {
                      background: "#f7a213",
                      height: "0",
                      border: "0",
                    },
                  }}
                  aria-label="tabs example"
                >
                  <Tab
                    sx={
                      innerTabvalue === "1"
                        ? {
                            ...innerTabStyling,
                            ...innerTabFocusStyling,
                          }
                        : { ...innerTabStyling }
                    }
                    value={"1"}
                    label={
                      <TabLabel
                        innerTab
                        active={innerTabvalue == "1" ? true : false}
                      >
                        Active
                      </TabLabel>
                    }
                  />
                  <Tab
                    sx={
                      innerTabvalue === "2"
                        ? {
                            ...innerTabStyling,
                            ...innerTabFocusStyling,
                          }
                        : { ...innerTabStyling }
                    }
                    value={"2"}
                    label={
                      <TabLabel
                        innerTab
                        active={innerTabvalue == "2" ? true : false}
                      >
                        History
                      </TabLabel>
                    }
                  />
                </TabList>

                <TabPanel value={"1"}>
                  <div className="mx-auto flex justify-center pt-4">
                    <p className="text-[0.85rem]">Details Not Found</p>
                  </div>
                </TabPanel>
                <TabPanel className="p-3" value={"2"}>
                  <TabContext value={innerInnerTabvalue}>
                    <TabList
                      component={"button"}
                      value={innerInnerTabvalue}
                      onChange={handleInnerInnerTabChange}
                      centered
                      TabIndicatorProps={{
                        style: {
                          background: "black",
                        },
                      }}
                      sx={{
                        height: "2.72rem",
                        minHeight: "0",
                      }}
                      aria-label="tabs example"
                    >
                      <Tab
                        sx={{
                          marginRight: "3.5rem",
                          minHeight: "40px",
                          px: "1.25rem",
                        }}
                        value={"1"}
                        label={
                          <TabLabel
                            innerInnerTab
                            active={innerInnerTabvalue === "1"}
                          >
                            Pending Review
                          </TabLabel>
                        }
                      />
                      <Tab
                        sx={{
                          marginRight: "3.5rem",
                          minHeight: "40px",
                          px: "1.25rem",
                        }}
                        value={"2"}
                        label={
                          <TabLabel
                            innerInnerTab
                            active={innerInnerTabvalue === "2"}
                          >
                            Review
                          </TabLabel>
                        }
                      />
                      <Tab
                        sx={{
                          marginRight: "3.5rem",
                          minHeight: "40px",
                          px: "1.25rem",
                        }}
                        value={"3"}
                        label={
                          <TabLabel
                            innerInnerTab
                            active={innerInnerTabvalue === "3"}
                          >
                            Donation
                          </TabLabel>
                        }
                      />
                    </TabList>
                    <TabPanel value={"1"}>
                      <div className="mx-auto flex justify-center pt-6">
                        <p className="text-[0.85rem]">Details Not Found</p>
                      </div>
                    </TabPanel>
                    <TabPanel value={"2"}>
                      <div className="mx-auto flex justify-center pt-6">
                        <p className="text-[0.85rem]">Details Not Found</p>
                      </div>
                    </TabPanel>
                    <TabPanel value={"3"}>
                      <div className="mx-auto flex justify-center pt-6">
                        <p className="text-[0.85rem]">Details Not Found</p>
                      </div>
                    </TabPanel>
                  </TabContext>
                </TabPanel>
              </TabContext>
            </TabPanel>
            <TabPanel value={"2"}>
              <div className="pt-[62px]">
                <Grid container>
                  <Grid item xl={8} paddingX={{ xl: 1 }}>
                    <Grid
                      sx={{ borderBottom: 1, borderColor: "divider" }}
                      padding={{ xl: 2 }}
                      container
                      alignItems={"center"}
                    >
                      <Grid item>
                        <p className="font-[600] tracking-tighter text-[#302F2F]">
                          Mobile Number
                        </p>
                      </Grid>
                      <Grid item paddingX={{ xl: 6 }}>
                        <p className="text-[0.915rem] tracking-tighter text-[#302F2F]">
                          91-9733935863
                        </p>
                      </Grid>
                    </Grid>
                    <Grid
                      sx={{ borderBottom: 1, borderColor: "divider" }}
                      padding={{ xl: 2 }}
                      container
                      alignItems={"center"}
                    >
                      <Grid item>
                        <p className="font-[600] tracking-tighter text-[#302F2F]">
                          Email Id
                        </p>
                      </Grid>
                      <Grid item paddingX={{ xl: 6 }}>
                        <p className="text-[0.915rem] tracking-tighter text-[#302F2F]">
                          example@gmail.com
                        </p>
                      </Grid>
                    </Grid>
                    <Grid
                      sx={{ borderBottom: 1, borderColor: "divider" }}
                      padding={{ xl: 2 }}
                      container
                      alignItems={"center"}
                    >
                      <Grid item xl={12}>
                        <p className="font-[600] tracking-tighter text-[#302F2F]">
                          About Me
                        </p>
                      </Grid>
                      <Grid item className="pt-2">
                        <p className="text-[0.915rem] tracking-tighter text-[#302F2F]">
                          Empty Bio
                        </p>
                      </Grid>
                    </Grid>
                    <Grid
                      sx={{ borderBottom: 1, borderColor: "divider" }}
                      padding={{ xl: 2 }}
                      container
                      alignItems={"center"}
                    >
                      <Grid item xl={12}>
                        <p className="font-[600] tracking-tighter text-[#302F2F]">
                          Gender
                        </p>
                      </Grid>
                      <Grid item className="pt-2">
                        <p className="text-[0.915rem] tracking-tighter text-[#302F2F]">
                          ?
                        </p>
                      </Grid>
                    </Grid>
                    <Grid
                      sx={{ borderBottom: 1, borderColor: "divider" }}
                      padding={{ xl: 2 }}
                      container
                      flexDirection={"row"}
                      alignItems={"start"}
                      gap={4}
                    >
                      <div className="flex-1">
                        <Grid item xl={12}>
                          <p className="font-[600] tracking-tighter text-[#302F2F]">
                            Location
                          </p>
                        </Grid>
                        <Grid item className="pt-2">
                          <p className="text-[0.915rem] tracking-tighter text-[#302F2F]">
                            Bangalore Railway Station Back Gate, M.G. Railway
                            Colony, Sevashrama, Bengaluru, Karnataka 560023,
                            India
                          </p>
                        </Grid>
                      </div>
                      <div className="flex-none">
                        <Grid item xl={12}>
                          <p className="font-[600] tracking-tighter text-[#302F2F]">
                            Birth Date
                          </p>
                        </Grid>
                        <Grid item className="pt-2">
                          <p className="text-[0.915rem] tracking-tighter text-[#302F2F]">
                            ?
                          </p>
                        </Grid>
                      </div>
                    </Grid>
                    <Grid
                      sx={{ borderBottom: 1, borderColor: "divider" }}
                      padding={{ xl: 2 }}
                      container
                      alignItems={"center"}
                    >
                      <Grid item xl={12}>
                        <p className="font-[600] tracking-tighter text-[#302F2F]">
                          Portfolio
                        </p>
                      </Grid>
                      <Grid item className="pt-2">
                        <p className="text-[0.915rem] tracking-tighter text-[#302F2F]">
                          Empty Portfolio
                        </p>
                      </Grid>
                    </Grid>
                    <Grid padding={{ xl: 2 }} container alignItems={"center"}>
                      <Grid item xl={12}>
                        <p className="font-[600] tracking-tighter text-[#302F2F]">
                          Language Known
                        </p>
                      </Grid>
                      <Grid item className="pt-2">
                        <Stack direction="row" spacing={1}>
                          <Chip
                            label="hindi"
                            sx={{
                              height: "28px",
                              color: "#F7A212",
                              borderRadius: "0.5rem",
                              border: "1px solid #F7A212",
                              fontSize: "0.75rem",
                            }}
                            variant="outlined"
                          />
                          <Chip
                            label="english"
                            variant="outlined"
                            sx={{
                              height: "28px",
                              color: "#F7A212",
                              borderRadius: "0.5rem",
                              border: "1px solid #F7A212",
                              fontSize: "0.75rem",
                            }}
                          />
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xl={4} paddingX={{ xl: 1 }}>
                    <div className="flex w-full flex-col bg-white">
                      <div className="my-14 flex w-full justify-between px-4 text-[1.4rem] font-bold">
                        <p className="">Donation</p>
                        <p className="text-[1.6rem] text-[#F7A212]">&#8377;0</p>
                      </div>
                      <div className="mx-1 flex flex-col gap-y-1 bg-[#f9fafb] px-2 py-3">
                        <p className="px-2 font-semibold">Interest</p>
                        <Stack
                          direction="row"
                          paddingBottom={{ xl: 1 }}
                          spacing={1}
                        >
                          <Chip
                            label="Magician"
                            sx={{
                              height: "30px",
                              color: "#253dc0",
                              borderRadius: "0.5rem",
                              border: "1px solid #253dc0",
                              fontSize: "0.9rem",
                              fontWeight: "600",
                            }}
                            variant="outlined"
                          />
                          <Chip
                            label="Dancer"
                            sx={{
                              height: "30px",
                              color: "#253dc0",
                              borderRadius: "0.5rem",
                              border: "1px solid #253dc0",
                              fontSize: "0.9rem",
                              fontWeight: "600",
                            }}
                            variant="outlined"
                          />
                          <Chip
                            label="Social Media"
                            sx={{
                              height: "30px",
                              color: "#253dc0",
                              borderRadius: "0.5rem",
                              border: "1px solid #253dc0",
                              fontSize: "0.9rem",
                              fontWeight: "600",
                            }}
                            variant="outlined"
                          />
                        </Stack>
                      </div>
                      <div className="mx-1 px-2 py-3">
                        <p className="px-1 font-semibold">Social Media</p>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </TabPanel>
          </TabContext>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Profile;
