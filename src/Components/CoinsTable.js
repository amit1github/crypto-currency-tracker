import React, { useEffect, useState } from "react";
import axios from "axios";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import {
  Container,
  createTheme,
  LinearProgress,
  Pagination,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./CoinsTable.module.css";
import { numberWithCommas } from "./Banner/Carousel";

const CustomizedPagination = styled(Pagination)`
  .MuiPaginationItem-root {
    color: rgb(238 188 29);
  }
`;

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  let navigate = useNavigate();

  const { currency, symbol } = CryptoState();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));

    setCoins(data);
    setLoading(false);
  };

  console.log(coins);

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container sx={{ textAlign: "center" }}>
        <Typography variant="h5" sx={{ m: "18px", fontFamily: "Montserrat" }}>
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search for a Crypto Currency..."
          variant="outlined"
          fullWidth
          sx={{ mb: "20px" }}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer>
          {loading ? (
            <LinearProgress sx={{ bgcolor: "gold" }} />
          ) : (
            <>
              <Table>
                <TableHead sx={{ bgcolor: "#EEBC1D" }}>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      sx={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableHead>
                <TableBody>
                  {handleSearch()
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((row) => {
                      const profit = row.price_change_percentage_24h > 0;

                      return (
                        <>
                          <TableRow
                            onClick={() => navigate(`/coins/${row.id}`)}
                            className={styles.row}
                            key={row.name}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              style={{
                                display: "flex",
                                gap: 15,
                              }}
                            >
                              <img
                                src={row?.image}
                                alt={row.name}
                                height="50"
                                sx={{ mb: "10px" }}
                              />
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <span
                                  style={{
                                    textTransform: "uppercase",
                                    fontSize: 22,
                                  }}
                                >
                                  {row.symbol}
                                </span>
                                <span style={{ color: "darkgray" }}>
                                  {row.name}
                                </span>
                              </div>
                            </TableCell>

                            <TableCell align="right">
                              {symbol}{" "}
                              {numberWithCommas(row.current_price.toFixed(2))}
                            </TableCell>

                            <TableCell
                              align="right"
                              style={{
                                color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                fontWeight: 500,
                              }}
                            >
                              {profit && "+"}
                              {row.price_change_percentage_24h.toFixed(2)}%
                            </TableCell>

                            <TableCell align="right">
                              {symbol}{" "}
                              {numberWithCommas(
                                row.market_cap.toString().slice(0, -6)
                              )}
                              M
                            </TableCell>
                          </TableRow>
                        </>
                      );
                    })}
                </TableBody>
              </Table>
            </>
          )}
        </TableContainer>

        {/* customized pagination and scrolling */}
        <CustomizedPagination
          count={(handleSearch()?.length / 10).toFixed(0)}
          sx={{
            padding: "20px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
