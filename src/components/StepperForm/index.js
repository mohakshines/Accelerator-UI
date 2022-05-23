import * as React from 'react';
import { Box, Stepper, Step, StepLabel, Button, Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Grid, Paper, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';


const steps = ['Select Type', 'Select Frameworks', 'Details'];

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'start',
    color: theme.palette.text.secondary,
}));

const StepperForm = () => {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ width: '60%', height: 300, position: 'relative' }}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel >{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length ? (
                    <>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset}>Reset</Button>
                        </Box>
                    </>
                ) : (
                    <div >
                        {activeStep === 0 && (
                            <Box style={{ marginTop: '10px' }}>
                                <Typography sx={{ mt: 2, mb: 1 }} >
                                    <FormControl>
                                        {/* <FormLabel id="demo-radio-buttons-group-label">Type</FormLabel> */}
                                        <RadioGroup
                                            defaultValue="desktop"

                                        >
                                            <FormControlLabel value="desktop" control={<Radio />} label="Desktop" />
                                            <FormControlLabel value="android" control={<Radio />} label="Android" />
                                        </RadioGroup>
                                    </FormControl>
                                </Typography>
                            </Box>
                        )}
                        {activeStep === 1 && (
                            <Box style={{ marginTop: '10px' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6} md={6}>
                                        <Item>
                                            <FormLabel><b>Frontend</b></FormLabel>
                                            <RadioGroup
                                                defaultValue="angular"
                                            >
                                                <FormControlLabel value="angular" control={<Radio />} label="Angular" />
                                                <FormControlLabel value="react" control={<Radio />} label="React" />
                                            </RadioGroup>
                                        </Item>
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                        <Item>
                                            <FormLabel><b>Backend</b></FormLabel>
                                            <RadioGroup
                                                defaultValue="spring_boot"
                                            >
                                                <FormControlLabel value="spring_boot" control={<Radio />} label="Spring Boot" />
                                                <FormControlLabel value="node" control={<Radio />} label="Node" />
                                                <FormControlLabel value="flask" control={<Radio />} label="Flask" />
                                            </RadioGroup>
                                        </Item>
                                    </Grid>
                                </Grid>
                            </Box>
                        )}
                        {activeStep === 2 && (

                            <Box style={{ marginTop: '20px' }}>
                                <TextField label="Project Name" variant="outlined" fullWidth style={{ marginBottom: '10px' }} />
                                <TextField label="Group" variant="outlined" fullWidth style={{ marginBottom: '10px' }} />
                            </Box>

                        )}
                        {/* <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}> */}
                        <div style={{ position: 'absolute', bottom: '0' }}>
                            <Paper>
                                <Button
                                    color="secondary"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    Back
                                </Button>
                            </Paper>
                        </div>
                        {/* <Box sx={{ flex: '1 1 auto' }} /> */}
                        <div style={{ position: 'absolute', bottom: '0', right: '0' }}>
                            <Paper>
                                <Button onClick={handleNext} >
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </Paper>
                        </div>
                        {/* </div>
                        </div> */}

                    </div>
                )
                }
            </Box >
        </div >
    );
}
export default StepperForm