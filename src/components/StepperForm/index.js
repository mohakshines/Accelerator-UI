import React, { useEffect, useState } from 'react';
import { Box, Stepper, Step, StepLabel, Button, Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Grid, Paper, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { fetchOptions } from "../../store/actions/formAction"

const steps = ['Select Type', 'Select Frameworks', 'Details'];

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'start',
    color: theme.palette.text.secondary,
}));

const StepperForm = () => {
    const [activeStep, setActiveStep] = useState(0);
    const dispatch = useDispatch();
    const { options, loading } = useSelector((state) => state.options);
    const [index, setIndex] = useState()
    const [type, setType] = useState('WEB')
    const [backend, setBackend] = useState("spring boot")
    const [frontend, setFrontend] = useState("react")

    useEffect(() => {
        dispatch(fetchOptions())
    }, [dispatch])

    // console.log(loading, options)

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    const handleReset = () => {
        setActiveStep(0);
    };

    function capitalize(input) {
        var words = input.split(' ');
        var CapitalizedWords = [];
        words.forEach(element => {
            CapitalizedWords.push(element[0].toUpperCase() + element.slice(1, element.length));
        });
        return CapitalizedWords.join(' ');
    }

    useEffect(() => {
        const index = options.frameworks?.findIndex((item) => item.backend === backend)
        setIndex(index)
    }, [backend])

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
                                            <RadioGroup value={type} onChange={(e) => setType(e.target.value)} >
                                                {options && options.type?.map((item) => {
                                                    return (
                                                        <FormControlLabel key={item} value={item} control={<Radio />} label={item} />
                                                    )
                                                })}
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
                                                <FormLabel><b>Backend</b></FormLabel>
                                                <RadioGroup value={backend} onChange={(e) => setBackend(e.target.value)}>
                                                    {options && options.backends?.map((item) => {
                                                        return (
                                                            <FormControlLabel key={item} value={item} control={<Radio />} label={capitalize(item)} />
                                                        )
                                                    })}
                                                </RadioGroup>
                                            </Item>
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                            <Item>
                                                <FormLabel><b>Frontend</b></FormLabel>
                                                <RadioGroup value={frontend} onChange={(e) => setFrontend(e.target.value)} >
                                                    {options && options.frameworks[index]?.frontend.map((val) => {
                                                        return (
                                                            <FormControlLabel value={val} control={<Radio />} label={capitalize(val)} />
                                                        )
                                                    })}
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

                        <div style={{ position: 'absolute', bottom: '0', right: '0' }}>
                            <Paper>
                                <Button onClick={handleNext} >
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </Paper>
                            </div>
                    </div>
                )
                }
            </Box >
        </div >
    );
}
export default StepperForm