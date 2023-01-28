/* eslint-disable react/jsx-boolean-value */
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import ChatBot from 'react-simple-chatbot';
// import { ThemeProvider } from '@mui/material/styles';
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  const steps = [
    {
      id: '1',
      message: 'Hello, Welcome Mr. Modiji',
      trigger: '2',
    },
    {
      id: '2',
      options: [
        { value: 1, label: 'Deiffernce between applications and my tenders ?', trigger: '4' },
        { value: 2, label: 'How to see an accident or an issue ?', trigger: '3' },
      ],
    },
    {
      id: '3',
      message: 'Click the map button to see. you can also share this lcation to concerned authority.',
      trigger: '2',
    },
    {
      id: '4',
      message: 'Applications are proposals built by contractors without the tender issued by government. Tenders are issued by the government where contractors apply and place bids.',
      end: true,
    },
  ];

  return (
    <>
      <Helmet>
        <title> Dashboard </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Products In Invetory" total={714000} icon={'fluent-emoji-high-contrast:hole'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Net Value of Inventory" total={1352831} color="info" icon={'fa6-solid:person-falling'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Proudcts Inbounded" total={1723315} color="warning" icon={'game-icons:double-street-lights'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Products Outbounded" total={234} color="error" icon={'maki:road-accident'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Goods Transactions"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2022',
                '02/01/2022',
                '03/01/2022',
                '04/01/2022',
                '05/01/2022',
                '06/01/2022',
                '07/01/2022',
                '08/01/2022',
                '09/01/2022',
                '10/01/2022',
                '11/01/2022',
              ]}
              chartData={[
                {
                  name: 'Number of Products Inbounded',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Number of Products Outbounded',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
                {
                  name: 'Number of Products in Inventory',
                  type: 'line',
                  fill: 'solid',
                  data: [50, 60, 56, 78, 48, 56, 64, 48, 64, 42, 56],
                }
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Inventory"
              chartData={[
                { label: 'Products near expiry', value: 4344 },
                { label: 'Products since 1 week', value: 545 },
                { label: 'Products Reported', value: 1443 },
                { label: 'Products Putawayed', value: 443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppNewsUpdate
              title="Recent Tenders"
              list={[...Array(5)].map(() => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
              }))}
            />
          </Grid> */}

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Goods Transactions"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2022',
                '02/01/2022',
                '03/01/2022',
                '04/01/2022',
                '05/01/2022',
                '06/01/2022',
                '07/01/2022',
                '08/01/2022',
                '09/01/2022',
                '10/01/2022',
                '11/01/2022',
              ]}
              chartData={[
                {
                  name: 'Number of Products Inbounded',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Number of Products Outbounded',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
                {
                  name: 'Inventory Value',
                  type: 'line',
                  fill: 'solid',
                  data: [50, 60, 56, 78, 48, 56, 64, 48, 64, 42, 56],
                }
              ]}
            />
          </Grid>


          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="In past 24 Hours"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '524 Products in inventory',
                  '126 Products outbounded',
                  '12 Products inbounded',
                  '21 Products putawayed',
                  '4 Products reported',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Products Putawayed"
              chartLabels={['Potholes', 'Manholes', 'Street Lights', 'Accidents']}
              chartData={[
                { name: 'Users', data: [80, 50, 30, 40] },
                { name: 'Contractors', data: [20, 30, 40, 80] },
                { name: 'Government', data: [44, 76, 78, 13] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid> */}

          <ChatBot steps={steps} floating={true} recognitionEnable={true} />
        
        </Grid>
      </Container>
    </>
  );
}
