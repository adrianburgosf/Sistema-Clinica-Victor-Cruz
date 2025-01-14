import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import EditExpedientesModal from './EditExpedientesModal';

//GRID
import { Box, Button } from '@mui/material'
import { DataGrid, esES } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport } from '@mui/x-data-grid';
import { PersonAdd, Delete, Person, Person2, Visibility, Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import moment from 'moment';
import dayjs from 'dayjs';

//ADD EXPEDIENTES MODAL
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';




//STYLES
import ExpedientesService from '../../Services/ExpedientesService';
import './ExpedientesStyle.css';


const Expedientes = () => {
   //========================================================================================================================================================================================================================
   //LOGIN VALIDATION
   const isLoggedIn = localStorage.getItem("isLoggedIn");

   //========================================================================================================================================================================================================================
   //EXPEDIENTES GRID DATA
   const navigate = useNavigate();
   const [expedientes, setExpedientes] = useState([]);
   //esto es para el popup
   const [openPopup, setOpenPopup] = useState(false);
   const [selectedExpedienteId, setSelectedExpedienteId] = useState(null);

   // const handleAddExpedientesClick = () => {
   //    navigate('/expedientes/crear');
   // };

   /*const handleEditExpedientesClick = (id) => {
      navigate(`/expedientes/${id}`);
      
   };*/

   const [isModalOpen1, setIsModalOpen1] = useState(false);

   const handleEditExpedientesClick = () => {
      setIsModalOpen1(true);
      <EditExpedientesModal />
   };


   //para el Popup
   const handleSelectedExpedientesClick = (id) => {
      setSelectedExpedienteId(id);
      setOpenPopup(true);
   }

   const handleDeleteExpedientesClick = (id) => {
      const deleteExpediente = async () => {
         await ExpedientesService.deleteExpedientes(id);

      };
      deleteExpediente();
      window.location.reload();
   };

   const theme = createTheme(
      {
         palette: {
            primary: { main: '#1976d2' },
         },
      },
      esES,
   );

   //Grid Column Visibility
   const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
      nombre: true,
      edad: true,
      fecha_nacimiento: false,
      sexo: true,
      correo: true,
      telefono: true,
      numid: true,
      estado_civil: false,
      padecimientos: false,
      ocupacion: false,
   });

   const CustomToolbar = () => {
      const theme = useTheme();
      const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

      return (
         <GridToolbarContainer
            sx={{
               display: 'flex',
               flexDirection: isMobile ? 'column' : 'row',
               justifyContent: 'space-between',
               alignItems: isMobile ? 'stretch' : 'center',
               marginTop: '15px',
               marginBottom: '10px',
               gap: '10px',
            }}
         >
            <div>
               {isMobile ? (
                  <>
                     <GridToolbarColumnsButton />
                     <GridToolbarFilterButton />
                     <GridToolbarDensitySelector />
                  </>
               ) : (
                  <>
                     <GridToolbarColumnsButton />
                     <GridToolbarFilterButton />
                     <GridToolbarDensitySelector />
                     <GridToolbarExport />
                  </>
               )}
            </div>

            <div>
               <Button
                  onClick={toggleModal}
                  startIcon={<PersonAdd />}
                  style={{
                     backgroundColor: 'rgb(27, 96, 241)',
                     color: 'white',
                     borderRadius: '10px',
                     paddingLeft: '10px',
                     paddingRight: '10px',
                  }}
               >
                  Agregar Expediente
               </Button>
            </div>

         </GridToolbarContainer>
      );
   };
   //==================================================================================================================================================================================

   //ADD EXPEDIENTES MODAL
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [expediente, setExpediente] = React.useState({
      nombre: '',
      edad: '',
      fecha_nacimiento: '',
      sexo: '',
      correo: '',
      telefono: '',
      numid: null,
      estado_civil: '',
      padecimientos: '',
      ocupacion: ''
   })
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [isSubmitting2, setIsSubmitting2] = useState(false);
   const listaEstadoCivil = ['Soltero/a', 'Casado/a', 'Divorciado/a', 'Viudo/a']

   const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
      setIsSubmitting(false);
   };

   const toggleModal2 = async (id) => {
      setID(id)
      console.log(id)
      try {
         const expedienteData = await ExpedientesService.getOneExpediente(id);
         console.log(expedienteData)
         setExpedientess([expedienteData]);
         setExpediente(expedienteData);
         console.log(expedienteData)
      } catch (error) {
         console.log(error);
      }

      setIsModalOpen1(!isModalOpen1);
      setIsSubmitting2(false);
   };

   const toggleModal22 = () => {


      setIsModalOpen1(!isModalOpen1);
      setIsSubmitting2(false);
   };

   const handleModalFieldChange = (e) => {
      setExpediente((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))

   }

   const calculateAge = (dob) => {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
         age--;
      }
      return age;
   };

   const handleDateChange = (date) => {

      console.log(date)
      setFechaNacimiento(date);
      const formattedDate = date ? date.toISOString().slice(0, 10) : '';
      console.log(formattedDate)
      setExpediente((prevState) => ({ ...prevState, fecha_nacimiento: formattedDate }))
      console.log(fecha_nacimiento)
      const age = formattedDate ? calculateAge(formattedDate) : '';
      console.log(age)
      setExpediente((prevState) => ({ ...prevState, edad: age }))

   };

   const [fecha_nacimiento, setFechaNacimiento] = useState(null);
   const [id, setID] = useState(null);
   const handleTextChange = (e) => {
      console.log(":)")
      setExpediente((prevState) => ({ ...prevState, fecha_nacimiento: e.target.value }))
      // Perform any validation or parsing logic if needed
      // Update the selectedDate state accordingly
   };

   const handleModalSubmit = async (e) => {
      e.preventDefault();
      console.log(expediente.edad)
      console.log(expediente.fecha_nacimiento)

      setIsSubmitting(true);


      if (validations()) {
         try {
            // Perform the form submission logic
            await ExpedientesService.postExpedientes(expediente);
            alert('Expediente Agregado');
            toggleModal();
            expediente.nombre = null;
            expediente.edad = null;
            expediente.fecha_nacimiento = null;
            expediente.sexo = null;
            expediente.correo = null;
            expediente.telefono = null;
            expediente.numid = null;
            expediente.estado_civil = null;
            expediente.padecimientos = null;
            expediente.ocupacion = null;

         } catch (error) {
            // Handle error if any
            console.log('Error submitting expediente:', error);
         }
      }
   };

   const EditHandler = () => {

      if (validations()) {
         const editExpediente = async () => {
            await ExpedientesService.editExpedientes(id, expediente);
            alert('Expediente Editado');
            toggleModal22();
         };
         console.log(expediente)
         editExpediente();

         navigate('/expedientes')
         window.location.reload();
      }
   };
   const validations = () => {
      const { nombre, edad, fecha_nacimiento, sexo, correo, estado_civil } = expediente
      if (nombre === null || nombre === '') {
         alert('Nombre Completo es requerido')
         return false
      }
      // if (edad === null || edad === '' || edad < 0) {
      //    console.log(edad)
      //    alert('Una edad valida es requerida')
      //    return false
      // }
      const selectedDate = new Date(fecha_nacimiento);
      const currentDate = new Date();
      if (isNaN(selectedDate.getTime())) {
         alert('Una Fecha valida de Nacimiento es requerida');
         return false;
      }
      if (selectedDate > currentDate) {
         alert('La Fecha de Nacimiento no puede ser mayor a la fecha actual');
         return false;
      }
      if (sexo === null || sexo === '') {
         alert('Sexo es requerido')
         return false
      }
      console.log(correo);
      if (!(correo == null || correo == '') &&(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(correo) == false)) {
         console.log("entro");
         alert("Debe ingresar un correo electronico valido.")
         return false
      }
      console.log("salio");
      if (estado_civil === null || estado_civil === '') {
         alert('Estado Civil es requerido')
         return false
      }

      return true
   }
   const [expedienteData, setExpedientess] = useState([]);

   const fetchExpediente = async (id) => {
      console.log(id)
      try {
         const expedienteData = await ExpedientesService.getOneExpediente(id);
         console.log(expedienteData)
         setExpedientess([expedienteData]);
         //setExpediente(expedienteData);
         console.log(expedienteData)
      } catch (error) {
         console.log(error);
      }
   };

   const defaultValue = expediente.sexo;
   const selectedValue2 = expediente.estado_civil;


   useEffect(() => {
      // Validación login
      if (!isLoggedIn) {
         // Redirigir si no se cumple la verificación
         navigate("/iniciarsesion"); // Redirige a la página de inicio de sesión
      }

      const fetchAllExpedientes = async () => {
         try {
            const expedientesData = await ExpedientesService.getAllExpedientes();
            const expedientesWithId = expedientesData.map((expediente) => ({
               ...expediente,
               pacienteId: expediente.idpaciente,
            }));
            setExpedientes(expedientesWithId);
         } catch (error) {
            // Handle error if any
            console.log("Error fetching expedientes:", error);
         }
      };

      // Update tabla
      fetchAllExpedientes();
      if (isSubmitting) {
         fetchAllExpedientes();
      }

      const handleResize = () => {
         const isMobile = window.innerWidth < 600; // Define the screen width threshold for mobile devices

         // Update the column visibility based on the screen width
         setColumnVisibilityModel((prevVisibility) => ({
            ...prevVisibility,
            nombre: true,
            edad: isMobile ? false : true,
            sexo: isMobile ? false : true,
            correo: isMobile ? false : true,
            telefono: isMobile ? false : true,
            numid: isMobile ? false : true,

         }));
      };

      // Call the handleResize function initially and on window resize
      handleResize();
      window.addEventListener("resize", handleResize);

      // Clean up the event listener on component unmount
      return () => {
         window.removeEventListener("resize", handleResize);
      };
   }, [isLoggedIn, navigate, isSubmitting]);

   const [selectedDate, setSelectedDate] = useState(null);
   const handleInputFocus = (event) => {
      event.target.blur(); // Remove focus from the input field
   };

   return (
      <div className='expedientesGrid'>
         <div className='expedientesGridBox'>
            <ThemeProvider theme={theme}>
               <DataGrid
                  rows={expedientes}
                  getRowId={(row) => row.pacienteId}
                  columns={[
                     //{ field: 'idpaciente', headerName: 'ID', flex: 1 , headerClassName: 'column-header'},
                     {
                        field: 'nombre',
                        headerName: 'Nombre',
                        flex: 5,
                        headerClassName: 'column-header',
                        renderCell: (params) => (
                           <div style={{ display: 'flex', alignItems: 'center', color: params.field === 'nombre' ? 'black' : 'rgb(121,121,121)' }}>
                              {params.row.sexo === 'M' ? (
                                 <Person style={{ color: '#fff', backgroundColor: 'rgb(26,94,235)', borderRadius: '50%', marginRight: '5px', fontSize: '200%' }} />
                              ) : (
                                 <Person2 style={{ color: '#fff', backgroundColor: 'rgb(236,43,254)', borderRadius: '50%', marginRight: '5px', fontSize: '200%' }} />
                              )}
                              {params.value}
                           </div>
                        ),
                     },
                     { field: 'edad', headerName: 'Edad', flex: 1, headerClassName: 'column-header' },
                     { field: 'fecha_nacimiento', headerName: 'Fecha de Nacimiento', flex: 3, headerClassName: 'column-header' },
                     { field: 'sexo', headerName: 'Sexo', flex: 1, headerClassName: 'column-header' },
                     {
                        field: 'correo',
                        headerName: 'Correo Electronico',
                        flex: 5,
                        headerClassName: 'column-header',
                        renderCell: (params) => (
                           <div style={{ display: 'flex', alignItems: 'center' }}>
                              {params.value && params.value.includes('@') ? (
                                 <div style={{ backgroundColor: 'rgb(200,213,255)', color: 'rgb(38,104,242)', padding: '4px 8px', borderRadius: '20px', marginRight: '5px' }}>
                                    {params.value}
                                 </div>
                              ) : (
                                 params.value
                              )}
                           </div>
                        ),
                     },
                     { field: 'telefono', headerName: 'Telefono Celular', flex: 3, headerClassName: 'column-header' },
                     { field: 'numid', headerName: 'Num. Identidad', flex: 4, headerClassName: 'column-header' },
                     { field: 'estado_civil', headerName: 'Estado Civil', flex: 4 },
                     { field: 'padecimientos', headerName: 'Padecimientos', flex: 4 },
                     { field: 'ocupacion', headerName: 'Ocupacion', flex: 3 },

                     {
                        field: 'actions',
                        headerName: '',
                        flex: 2,
                        renderCell: (params) => (
                           <div>
                              <IconButton onClick={() => toggleModal2(params.id)}  >
                                 <Edit />
                              </IconButton>

                              <IconButton onClick={() => handleDeleteExpedientesClick(params.id)}>
                                 <Delete />
                              </IconButton>
                           </div>
                        ),
                     },

                  ]}
                  components={{
                     Toolbar: CustomToolbar,
                  }}

                  columnVisibilityModel={columnVisibilityModel}
                  onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
               />
            </ThemeProvider>
            <Modal open={isModalOpen} onClose={toggleModal}>
               <div className='modalContainer'>
                  <h2 className="modalHeader">NUEVO EXPEDIENTE</h2>
                  <Box
                     component="form"
                     sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        width: '100%', // Added width property

                     }}
                     noValidate
                     autoComplete="off"
                  >
                     <TextField id="nombre" label="Nombre Completo" variant="outlined" onChange={handleModalFieldChange} name='nombre' required />
                     <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                           {/*} <LocalizationProvider dateAdapter={AdapterDayjs}>

                              <DatePicker id="fecha_nacimiento" diabled label="Fecha de Nacimiento"  value={fecha_nacimiento || null} renderInput={(params) => <TextField {...params} disabled/>} onChange={handleDateChange} name='fecha_nacimiento' />

                           </LocalizationProvider>*/}
                           <LocalizationProvider dateAdapter={AdapterDayjs}>

                              <MobileDatePicker
                                 id="fecha_nacimiento"
                                 value={fecha_nacimiento || null}
                                 onChange={handleDateChange}
                                 renderInput={(params) => <TextField {...params} />}
                                 name='fecha_nacimiento'
                              />
                           </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                           <div className='radioGroupContainer'>
                              <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" className='sexoRadioGroup' id='sexo' onChange={handleModalFieldChange} name="sexo" required>
                                 <FormControlLabel value="M" control={<Radio />} label="Masculino" />
                                 <FormControlLabel value="F" control={<Radio />} label="Femenino" />
                              </RadioGroup>
                           </div>
                        </Grid>
                     </Grid>
                     <TextField id="ocupacion" label="Ocupación" variant="outlined" onChange={handleModalFieldChange} name='ocupacion' />
                     <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                           <TextField id="correo" label="Correo Electrónico" variant="outlined" type='email' onChange={handleModalFieldChange} name='correo' />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                           <TextField id="telefono" label="Teléfono" variant="outlined" onChange={handleModalFieldChange} name='telefono' />
                        </Grid>
                     </Grid>
                     <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                           <TextField id="numid" label="Número de Identidad" variant="outlined" onChange={handleModalFieldChange} name='numid' />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                           <Autocomplete
                              disablePortal
                              id="estado_civil"
                              required
                              options={listaEstadoCivil}
                              onChange={(event, newValue) =>
                                 setExpediente({
                                    ...expediente,
                                    estado_civil: newValue
                                 })
                              }
                              renderInput={(params) => <TextField {...params} label="Estado Civil" required />}

                           />
                        </Grid>
                     </Grid>
                     <Button onClick={handleModalSubmit} variant="contained" style={{
                        backgroundColor: 'rgb(27,96,241)', color: 'white', borderRadius: '10px',
                        paddingLeft: '10px', paddingRight: '10px', width: '270px', fontSize: '18px', alignSelf: 'center'
                     }}>
                        Agregar Expediente
                     </Button>
                  </Box>
               </div>
            </Modal>

            <Modal open={isModalOpen1} onClose={toggleModal22}>

               <div className='modalContainer'>
                  {expedienteData.map((expediente) => (
                     <div className='expedienteCard' key={expediente.idpaciente}>

                        <h2 className="modalHeader">EDITAR EXPEDIENTE</h2>

                        <Box
                           component="form"//edit modal
                           sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '10px',
                              width: '100%', // Added width property
                           }}
                           noValidate
                           autoComplete="off"
                        >
                           <TextField id="nombre" label="Nombre Completo" defaultValue={expediente.nombre} variant="outlined" onChange={handleModalFieldChange} name='nombre' required />
                           <Grid container spacing={2}>
                              <Grid item xs={12} sm={6}>

                                 <LocalizationProvider dateAdapter={AdapterDayjs}>

                                    <MobileDatePicker
                                       id="fecha_nacimiento"
                                       defaultValue={dayjs(expediente.fecha_nacimiento)}
                                       onChange={handleDateChange}
                                       renderInput={(params) => <TextField {...params} />}
                                       name='fecha_nacimiento'
                                    />
                                 </LocalizationProvider>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                 <div className='radioGroupContainer'>
                                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" value={defaultValue} className='sexoRadioGroup' id='sexo' onChange={handleModalFieldChange} name="sexo" required>
                                       <FormControlLabel value="M" control={<Radio />} label="Masculino" />
                                       <FormControlLabel value="F" control={<Radio />} label="Femenino" />
                                    </RadioGroup>
                                 </div>
                              </Grid>
                           </Grid>
                           <TextField id="ocupacion" label="Ocupación" variant="outlined" defaultValue={expediente.ocupacion} onChange={handleModalFieldChange} name='ocupacion'  />
                           <Grid container spacing={2}>
                              <Grid item xs={12} sm={6}>
                                 <TextField id="correo" label="Correo Electrónico" defaultValue={expediente.correo} variant="outlined" type='email' onChange={handleModalFieldChange} name='correo' />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                 <TextField id="telefono" label="Teléfono" variant="outlined" defaultValue={expediente.telefono} onChange={handleModalFieldChange} name='telefono' />
                              </Grid>
                           </Grid>
                           <Grid container spacing={2}>
                              <Grid item xs={12} sm={6}>
                                 <TextField id="numid" label="Número de Identidad" variant="outlined" defaultValue={expediente.numid} onChange={handleModalFieldChange} name='numid' />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                 <Autocomplete
                                    value={selectedValue2}
                                    disablePortal
                                    id="estado_civil"
                                    required
                                    options={listaEstadoCivil}
                                    onChange={(event, newValue) =>
                                       setExpediente({
                                          ...expediente,
                                          estado_civil: newValue
                                       })
                                    }
                                    renderInput={(params) => <TextField {...params} label="Estado Civil" required />}

                                 />
                              </Grid>
                           </Grid>
                           <Button onClick={EditHandler} variant="contained" style={{
                              backgroundColor: 'rgb(27,96,241)', color: 'white', borderRadius: '10px',
                              paddingLeft: '10px', paddingRight: '10px', width: '270px', fontSize: '18px', alignSelf: 'center'
                           }}>
                              Editar Expediente
                           </Button>
                        </Box>
                     </div>
                  ))}
               </div>
            </Modal>

         </div>
      </div>
   );



}

export default Expedientes 