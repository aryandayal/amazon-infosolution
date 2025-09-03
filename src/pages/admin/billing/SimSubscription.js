import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import Header from "../../../components/Header";
import BottomNavbar from "../../../components/BottomNavbar";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import './simsubscription.css';

const SimSubscription = () => {
  // Sample data with new fields
  const [simCards,] = useState([
    {
      id: 1,
      simNumber: '8954031234567890123',
      imei: '356765098765432',
      company: '',
      vehicle: 'Toyota Camry',
      purchaseDate: '2022-01-15',
      expiredOn: '2023-12-31',
      ratePlan: 'Super Gold X Combo Plus',
      mismatch: 'No',
      status: 'Pending Discontinue request',
    },
    {
      id: 2,
      simNumber: '8954031234567890124',
      imei: '356765098765433',
      company: 'Telecom Corp',
      vehicle: 'Honda Civic',
      purchaseDate: '2022-03-20',
      expiredOn: '2024-03-15',
      ratePlan: 'Super Gold X Combo Plus',
      mismatch: 'Yes',
      status: 'Active',
    },
    {
      id: 3,
      simNumber: '8954031234567890125',
      imei: '356765098765434',
      company: '',
      vehicle: 'Ford F-150',
      purchaseDate: '2022-05-10',
      expiredOn: '2024-06-30',
      ratePlan: 'Super Gold X Combo Plus',
      mismatch: 'No',
      status: 'Expired',
    },
    {
      id: 4,
      simNumber: '8954031234567890126',
      imei: '356765098765435',
      company: 'Mobile Solutions',
      vehicle: 'Tesla Model 3',
      purchaseDate: '2022-02-28',
      expiredOn: '2023-11-20',
      ratePlan: 'Super Gold X Combo Plus',
      mismatch: 'Yes',
      status: 'Pending Discontinue request',
    },
    {
      id: 5,
      simNumber: '8954031234567890127',
      imei: '356765098765436',
      company: '',
      vehicle: 'Chevrolet Malibu',
      purchaseDate: '2022-04-05',
      expiredOn: '2024-01-15',
      ratePlan: 'Super Gold X Combo Plus',
      mismatch: 'No',
      status: 'Active',
    },
  ]);

  // Filter states
  const [filters, setFilters] = useState({
    provider: '',
    simImei: '',
    expiryDate: '',
    mismatchPlan: '',
    ratePlan: ''
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleApplyFilters = () => {
    console.log('Applying filters:', filters);
  };

  const handleDownloadExcel = () => {
    console.log('Downloading Excel');
  };

  const handleAction = (id, action) => {
    console.log(`Action ${action} for SIM with id: ${id}`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Filter SIM cards
  const filteredSimCards = simCards.filter((simCard) => {
    const matchesProvider = filters.provider ? 
      (simCard.company || '').toLowerCase().includes(filters.provider.toLowerCase()) : true;
    
    const matchesSimImei = filters.simImei ? 
      simCard.simNumber.includes(filters.simImei) || 
      simCard.imei.includes(filters.simImei) : true;
    
    const matchesExpiryDate = filters.expiryDate ? 
      simCard.expiredOn.includes(filters.expiryDate) : true;
    
    const matchesMismatchPlan = filters.mismatchPlan ? 
      (filters.mismatchPlan === 'Yes' ? simCard.mismatch === 'Yes' : simCard.mismatch === 'No') : true;
    
    const matchesRatePlan = filters.ratePlan ? 
      simCard.ratePlan === filters.ratePlan : true;
    
    return matchesProvider && matchesSimImei && 
           matchesExpiryDate && matchesMismatchPlan && matchesRatePlan;
  });

  // Sorting
  const sortedSimCards = filteredSimCards.sort((a, b) => {
    if (order === 'asc') {
      return a[orderBy] > b[orderBy] ? 1 : -1;
    } else {
      return a[orderBy] < b[orderBy] ? 1 : -1;
    }
  });

  // Pagination
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredSimCards.length) : 0;

  // Options
  const providerOptions = ['All', 'Telecom Corp', 'Mobile Solutions'];
  const expiryDateOptions = ['All', '2023-11-20', '2023-12-31', '2024-01-15', '2024-03-15', '2024-06-30'];
  const mismatchPlanOptions = ['All', 'Yes', 'No'];
  const ratePlanOptions = ['All', 'Super Gold X Combo Plus', 'Basic Plan', 'Premium Plan'];

  return (
    <>
    <Helmet>
            <title>SimSubscription</title>
          </Helmet>
    <Header />
    <BottomNavbar text="SimSubscription" />
    <Box className="sim-subscription-container">
      <Typography variant="h4" className="page-title">
        SIM Subscription
      </Typography>
      
      {/* Filter Section */}
      <Box className="filter-section">
        {/* First row */}
        <Box className="filter-row">
          <FormControl className="filter-item" size="small">
            <InputLabel>Provider</InputLabel>
            <Select
              name="provider"
              value={filters.provider}
              label="Provider"
              onChange={handleFilterChange}
            >
              {providerOptions.map((option) => (
                <MenuItem key={option} value={option === 'All' ? '' : option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <TextField
            name="simImei"
            label="SIM/IMEI"
            variant="outlined"
            size="small"
            value={filters.simImei}
            onChange={handleFilterChange}
            className="filter-item"
          />
          
          <FormControl className="filter-item" size="small">
            <InputLabel>Expiry Date</InputLabel>
            <Select
              name="expiryDate"
              value={filters.expiryDate}
              label="Expiry Date"
              onChange={handleFilterChange}
            >
              {expiryDateOptions.map((option) => (
                <MenuItem key={option} value={option === 'All' ? '' : option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        
        {/* Second row */}
        <Box className="filter-row">
          <FormControl className="filter-item" size="small">
            <InputLabel>Mismatch Plan</InputLabel>
            <Select
              name="mismatchPlan"
              value={filters.mismatchPlan}
              label="Mismatch Plan"
              onChange={handleFilterChange}
            >
              {mismatchPlanOptions.map((option) => (
                <MenuItem key={option} value={option === 'All' ? '' : option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl className="filter-item" size="small">
            <InputLabel>Rate Plan</InputLabel>
            <Select
              name="ratePlan"
              value={filters.ratePlan}
              label="Rate Plan"
              onChange={handleFilterChange}
            >
              {ratePlanOptions.map((option) => (
                <MenuItem key={option} value={option === 'All' ? '' : option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <Box className="filter-actions">
            <Button
              variant="contained"
              startIcon={<FilterListIcon />}
              onClick={handleApplyFilters}
              className="filter-button"
            >
              FILTER
            </Button>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={handleDownloadExcel}
              className="download-button"
            >
              DOWNLOAD EXCEL
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} className="table-container">
        <Table className="sim-table" aria-label="sim card table">
          <TableHead>
            <TableRow>
              <TableCell sortDirection={orderBy === 'id' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'id'}
                  direction={orderBy === 'id' ? order : 'asc'}
                  onClick={() => handleRequestSort('id')}
                >
                  #
                </TableSortLabel>
              </TableCell>
              <TableCell>Sim Number</TableCell>
              <TableCell>IMEI</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Vehicle</TableCell>
              <TableCell sortDirection={orderBy === 'purchaseDate' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'purchaseDate'}
                  direction={orderBy === 'purchaseDate' ? order : 'asc'}
                  onClick={() => handleRequestSort('purchaseDate')}
                >
                  Purchase Date
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === 'expiredOn' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'expiredOn'}
                  direction={orderBy === 'expiredOn' ? order : 'asc'}
                  onClick={() => handleRequestSort('expiredOn')}
                >
                  Expired On
                </TableSortLabel>
              </TableCell>
              <TableCell>Rate Plan</TableCell>
              <TableCell>Mismatch</TableCell>
              <TableCell>Activate</TableCell>
              <TableCell>Continue</TableCell>
              <TableCell>Discontinue</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedSimCards
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((simCard) => (
                <TableRow key={simCard.id} className="table-row">
                  <TableCell>{simCard.id}</TableCell>
                  <TableCell className="sim-number">{simCard.simNumber}</TableCell>
                  <TableCell>{simCard.imei}</TableCell>
                  <TableCell>{simCard.company || '-'}</TableCell>
                  <TableCell>{simCard.vehicle}</TableCell>
                  <TableCell>{simCard.purchaseDate}</TableCell>
                  <TableCell>{simCard.expiredOn}</TableCell>
                  <TableCell>{simCard.ratePlan}</TableCell>
                  <TableCell>
                    <Chip 
                      label={simCard.mismatch} 
                      color={simCard.mismatch === 'Yes' ? 'error' : 'success'}
                      size="small" 
                    />
                  </TableCell>
                  <TableCell>
                    <Button 
                      size="small" 
                      variant="outlined"
                      onClick={() => handleAction(simCard.id, 'activate')}
                      disabled={simCard.status === 'Active'}
                    >
                      Activate
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button 
                      size="small" 
                      variant="outlined"
                      onClick={() => handleAction(simCard.id, 'continue')}
                      disabled={simCard.status !== 'Active'}
                    >
                      Continue
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button 
                      size="small" 
                      variant="outlined"
                      onClick={() => handleAction(simCard.id, 'discontinue')}
                      disabled={simCard.status === 'Expired' || simCard.status === 'Pending Discontinue request'}
                    >
                      Discontinue
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={simCard.status} 
                      color={
                        simCard.status === 'Active' ? 'success' : 
                        simCard.status === 'Expired' ? 'error' : 'warning'
                      }
                      size="small" 
                      className="status-chip"
                    />
                  </TableCell>
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={13} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredSimCards.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
    </>
  );
};

export default SimSubscription;