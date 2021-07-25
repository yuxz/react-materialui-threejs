import * as React from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import BarChartIcon from '@material-ui/icons/BarChart';



export default function BasicCard() {
  return (
    <Card color="secondary" sx={{ minWidth: 275 }}>
      <CardContent>        
				<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={2}>
					<Grid item xs={8}>
					<Typography variant="h4" component="div">
					16680
					</Typography>       
					<Typography variant="h6">
						New Orders          
					</Typography>
					</Grid>
					<Grid item xs={4}>
					 <BarChartIcon color="info" style={{width:"3em",height:"3em"}} />
					</Grid>   
					</Grid>    
				</Box>			
      </CardContent>
    </Card>
  );
}
