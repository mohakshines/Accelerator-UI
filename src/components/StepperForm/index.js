import React, { useEffect, useState } from 'react';
import { Box, Stepper, Step, StepLabel, Button, Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Grid, Paper, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { fetchOptions, fetchYml } from "../../store/actions/formAction"
import CodeEditor from '@uiw/react-textarea-code-editor';
import './StepperForm.css'
import DownloadingIcon from '@mui/icons-material/Downloading';
import axios from 'axios';

const steps = ['Select Type', 'Select Frameworks', 'Details', 'Choose Setting'];

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
    const { yml } = useSelector((state) => state.yml);

    const [index, setIndex] = useState(0)
    const [type, setType] = useState('WEB')
    const [ymlFile, setYmlFile] = useState()
    const [backend, setBackend] = useState("spring boot")
    const [frontend, setFrontend] = useState("react")
    const [customizeType, setCustomizeType] = useState('default')

    useEffect(() => {
        dispatch(fetchOptions())
        dispatch(fetchYml())

    }, [dispatch])

    useEffect(() => {
        if (yml) {
            setYmlFile(yml)
        }
    }, [yml])


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
    // console.log(options)

    useEffect(() => {
        if (options?.frameworks) {
            const index = options.frameworks?.findIndex((item) => item.backend === backend)
            setIndex(index)
        }
    }, [backend, options?.frameworks])

    const handleDownload = async () => {
        const data = {
            'appName': 'appname',
            'backend': backend,
            'frontend': frontend,
            'form': {}
        }
        // axios.post('http://localhost:8080/api/v1/generate', data, { responseType: 'arraybuffer' })
        axios({
            url: 'https://accelerator-generator-backend.herokuapp.com/api/v1/generate',
            data: data,
            method: 'post',
            responseType: 'blob'
        })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]))
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'file.zip');
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            },
                (error) => {
                    console.log(error);
                });
    }



    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '150px', }}>
            <Box sx={{ height: 400, position: 'relative' }} className='form'>
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
                        <div className='reset-page'>
                            <div>
                                <Typography gutterBottom>
                                    Click to Download your zip project.
                                </Typography>
                                <Button variant="outlined" startIcon={<DownloadingIcon />} onClick={handleDownload} style={{ marginTop: '10px' }}>
                                    Download
                                </Button>
                            </div>
                        </div>
                        <div style={{ position: 'absolute', bottom: '0', right: '0' }}>
                            <Paper>
                                <Button onClick={handleReset} size="large" >Reset</Button>
                            </Paper>
                        </div>
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
                                            <Item style={{ minHeight: '150px' }}>
                                                <FormLabel><b>Frontend</b></FormLabel>
                                                <RadioGroup value={frontend} onChange={(e) => setFrontend(e.target.value)} >
                                                    {options && options.frameworks[index]?.frontend.map((val) => {
                                                        return (
                                                            <FormControlLabel key={val} value={val} control={<Radio />} label={capitalize(val)} />
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
                                    {options && options.frameworks[index]?.form.map((item) => {
                                        var result = item.replace(/([A-Z])/g, " $1");
                                        var finaltext = result.charAt(0).toUpperCase() + result.slice(1);
                                        return (
                                            <TextField key={finaltext} label={finaltext} variant="outlined" fullWidth style={{ marginBottom: '10px' }} />
                                        )
                                    })}
                                </Box>

                        )}
                            {activeStep === 3 && (
                                <Box style={{ marginTop: '10px' }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6} md={6}>
                                            <Item>
                                                {/* <FormLabel><b>Backend</b></FormLabel> */}
                                                <RadioGroup value={customizeType} onChange={(e) => setCustomizeType(e.target.value)}>
                                                    <FormControlLabel value="default" control={<Radio />} label="Default" />
                                                    <FormControlLabel disabled value="customize" control={<Radio />} label="Customize" />
                                                </RadioGroup>
                                            </Item>
                                        </Grid>
                                        <Grid item xs={6} md={6}>

                                                <CodeEditor
                                                    value={ymlFile}
                                                    language="yml"
                                                    placeholder="Please enter YML code."
                                                    onChange={(evn) => setYmlFile(evn.target.value)}
                                                    padding={15}
                                                    style={{
                                                        fontSize: 12,
                                                        backgroundColor: "black",
                                                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                                                        overflowY: 'scroll',
                                                        maxHeight: '300px'
                                                    }}
                                                    disabled

                                                />

                                        </Grid>
                                    </Grid>
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
                )}
            </Box >
        </div >
    );
}
export default StepperForm

var z = [{ a: 'string' }, { b: 'string' }]