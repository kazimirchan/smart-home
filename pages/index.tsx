import type { GetServerSideProps, NextPage } from "next"
import Head from "next/head"
import { TableColumnData, TableBodyData } from "../models/TableData"
import styles from "../styles/Home.module.sass"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { Container, Typography } from "@mui/material"
import axios from "axios"

interface Props {
  tableData: TableColumnData
}

export default function Home(props: Props) {
  const tableColumns = props.tableData.table.reduce((acc, cur) => ({ ...acc, [cur]: "" }), {})

  const tableHead = Object.keys(tableColumns).map((columnHeader: string, index: number) => {
    return <TableCell key={"column_" + index}>{columnHeader}</TableCell>
  })
  const tableBody = props.tableData.data.map((row: Object, index: number) => {
    const rowData = Object.keys(tableColumns).map((value: string, index: number) => {
      return <TableCell key={"cell_" + index}>{row[value] || ""}</TableCell>
    })
    return <TableRow key={index}>{rowData}</TableRow>
  })

  return (
    <div className={styles.container}>
      <Head>
        <title>Smart home app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <Typography variant="h4">SMART HOME APP</Typography>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>{tableHead}</TableRow>
            </TableHead>
            <TableBody>{tableBody}</TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const tableData = await axios
    .get("http://0.0.0.0:3000" + "/api/tableDataService")
    .then((resp) => resp.data)
    .catch((error) => {
      console.error(error)
    })
  return { props: { tableData: tableData } as Props }
}
