import * as React from 'react';
import { useContext, useState } from 'react';
import { Context } from '../../Utils/Context';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Grid, Dialog, Hidden, Button } from '@material-ui/core';
import { RequestDetailsComponent } from '../Details/RequestDetailsComponent';
import CloseIcon from '@material-ui/icons/Close';



export default function MyCompletedRequests() {
  const { myRequests } = useContext(Context);
  const [requestDetails, setRequestDetails] = useState({...myRequests[0], open:false});
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="center">Status</TableCell>
              <Hidden smDown>
                  <TableCell variant="head" align="center">Process</TableCell>
                </Hidden>
              <Hidden smDown>
                  <TableCell variant="head" align="center">Approval Status</TableCell>
                </Hidden>
                <Hidden smDown>
                  <TableCell variant="head" align="center">Service Status</TableCell>
                </Hidden>
                <Hidden smDown>
                  <TableCell variant="head" align="center">Beneficiary</TableCell>
                </Hidden>
                <Hidden smDown>
                  <TableCell variant="head" align="center">Created</TableCell>
                </Hidden>
                <Hidden smDown>
                  <TableCell variant="head" align="center">Modified</TableCell>
                </Hidden>
            </TableRow>
          </TableHead>
          <TableBody>
            {myRequests
            .filter(request => request.Status === "Success" || request.Status === "Unsuccess" )
            .map((row) => (
              <TableRow key={row.Id} onClick={() =>setRequestDetails({...row, open:true})}>
                <TableCell align="center">{row.Id}</TableCell>
                <TableCell align="center">{row.Status}</TableCell>
                <Hidden smDown>
                    <TableCell variant="body" align="center">{row.Process}</TableCell>
                  </Hidden>
                  <Hidden smDown>
                    <TableCell variant="body" align="center">{row.ApprovalStatus}</TableCell>
                  </Hidden>
                  <Hidden smDown>
                    <TableCell variant="body" align="center">{row.ServiceStatus}</TableCell>
                  </Hidden>
                  <Hidden smDown>
                    <TableCell variant="body" align="center">{row.EmployeeName}</TableCell>
                  </Hidden>
                  <Hidden smDown>
                    <TableCell variant="body" align="center">{row.Created}</TableCell>
                  </Hidden>
                  <Hidden smDown>
                    <TableCell variant="body" align="center">{row.Modified}</TableCell>
                  </Hidden>
              </TableRow>
            ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        fullScreen
        open={requestDetails.open}
        onClose={()=> setRequestDetails({...requestDetails, open:false})}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Button variant="contained"
          onClick={()=> setRequestDetails({...requestDetails, open:false})}
          >
          <CloseIcon/>
        </Button>
        <RequestDetailsComponent requestDetails={requestDetails}/>
      </Dialog>
      </Grid>
    </Grid>

  );
}


