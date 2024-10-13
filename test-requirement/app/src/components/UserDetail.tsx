import React, { useState } from "react";
import { Box, Typography, Tab } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useSpring, animated } from "@react-spring/web";
import CloseIcon from "@mui/icons-material/Close";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import InfoDetail from "./InfoDetail";
import UserLog from "./UserLog";
import { useGetUserByIdQuery, useSearchEventQuery } from "../api/api";
import Loading from "./Loading";
import { EventFilterRequest } from "../redux/action";

interface Props {
  userId: string;
  onClose: () => void;
}

function UserDetail({ onClose, userId }: Props) {
  const { data: user, isLoading: isLoadingUser } = useGetUserByIdQuery(userId);

  const [eventFilter, setEventFiler] = useState<EventFilterRequest>({
    authorId: userId,
  });
  const { data: events = [], isLoading: isLoadingEvents} =
    useSearchEventQuery(eventFilter);

  const isLoading = isLoadingUser || isLoadingEvents;

  const [value, setValue] = useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const showStyle = useSpring({
    from: { opacity: 0, transform: "translateX(100%)" },
    to: { opacity: 1, transform: "translateX(0%)" },
    config: { tension: 300, friction: 30 },
  });

  console.log(eventFilter)

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Modal open={true} onClose={onClose}>
      <animated.div style={showStyle}>
        <Box
          sx={{
            width: "680px",
            height: "100vh",
            bgcolor: "white",
            position: "absolute",
            right: 0,
            padding: "15px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                color: "rgba(17, 25, 39, 1)",
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              {user?.fullName}
            </Typography>
            <div onClick={onClose} style={{ cursor: "pointer" }}>
              <CloseIcon sx={{ fontSize: 20, marginTop: "4px" }} />
            </div>
          </Box>

          <Box
            sx={{
              width: "100%",
              typography: "body1",
              marginTop: "10px",
              overflow: "auto",
              flex: 1,
            }}
          >
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="simple tabs example"
                >
                  <Tab
                    label="Overview"
                    value="1"
                    sx={{
                      fontWeight: 600,
                      color:
                        value === "1"
                          ? "rgba(99, 91, 255, 1)"
                          : "rgba(99, 99, 99, 1)",
                      "&.Mui-selected": {
                        borderBottom: "2px solid rgba(99, 91, 255, 1)",
                      },
                    }}
                  />
                  <Tab
                    label="Logs"
                    value="2"
                    sx={{
                      fontWeight: 600,
                      color:
                        value === "2"
                          ? "rgba(99, 91, 255, 1)"
                          : "rgba(99, 99, 99, 1)",
                      "&.Mui-selected": {
                        borderBottom: "2px solid rgba(99, 91, 255, 1)",
                      },
                    }}
                  />
                </TabList>
              </Box>
              <TabPanel value="1">
                {user && <InfoDetail user={user} />}
              </TabPanel>
              <TabPanel value="2">
                {userId && events && (
                  <UserLog userId={userId} events={events} onChangeFilter={(filter) => setEventFiler(filter)} filter={eventFilter}/>
                )}
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
      </animated.div>
    </Modal>
  );
}

export default UserDetail;
