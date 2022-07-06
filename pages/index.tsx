import type { GetServerSideProps, NextPage } from "next"
import Head from "next/head"
import { TableData } from "../models/TableData"
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
  tableData: TableData
}

export default function Home(props: Props) {
  const tableHead = props.tableData.table.map((columnHeader: string, index: number) => {
    return <TableCell key={"column_" + index}>{columnHeader}</TableCell>
  })
  const tableBody = props.tableData.data.map((row: Object, index: number) => {
    let rowValues = Object.values(row)
    return (
      <TableRow key={index}>
        {rowValues.map((cellData: string, childIndex: number) => {
          return <TableCell key={index + "_" + childIndex}>{cellData}</TableCell>
        })}
      </TableRow>
    )
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
  const tableData = await axios.get("http://0.0.0.0:3000" + "/api/tableDataService").then((resp) => resp.data)
  return { props: { tableData: tableData } as Props }
}
