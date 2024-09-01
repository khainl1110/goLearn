import { Button, Stack, TextField } from "@mui/material";

export default function MainApp() {
    return (
        <div>
            <h2>Post it here</h2>
            <Stack width={500}>
                <TextField/>
                <div>
                    <Button>Submit</Button>
                    <Button>Another test</Button>
                </div>
            </Stack>
        </div>
    )
}