import { Box, Typography, useTheme, Button, Stack } from '@mui/material';
import { EmojiSad } from 'iconsax-react';

const ErrorResponse = ({
  background,
  height = 'auto',
  width = 'auto',
  boxWidth = 300,
  errorTitle = 'Error Occured',
  errorMessage = 'Something went wrong.',
  errorIcon,
  onRetry,
  onClose,
  loading = false,
  buttonText = 'Retry',
  buttonTextLoading = 'Retrying...',
  flexGrow = false,
}: {
  height?: string | number;
  width?: string | number;
  boxWidth?: string | number;
  errorMessage?: string;
  errorTitle?: string;
  errorIcon?: React.ReactNode;
  background?: string;
  onRetry?: () => void;
  onClose?: () => void;
  buttonText?: string;
  buttonTextLoading?: string;
  loading?: boolean;
  flexGrow?: boolean;
}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'grid',
        placeItems: 'center',
        height: height,
        width: width,
        flexGrow: flexGrow ? 1 : undefined,
      }}
    >
      <Box
        sx={{
          p: 2,
          background: background || theme.palette.background.default,
          borderRadius: 2,
          width: boxWidth,
          minHeight: 200,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {errorIcon || (
          <EmojiSad variant='Bulk' size={50} color={theme.palette.error.main} />
        )}
        <Typography
          variant='h6'
          fontWeight='bold'
          color='error'
          textAlign='center'
          mt={1}
        >
          {errorTitle}
        </Typography>
        <Typography
          variant='body2'
          fontWeight='normal'
          color='error'
          textAlign='center'
          mb={2}
        >
          {errorMessage}
        </Typography>
        <Stack direction='row' spacing={2}>
          {onClose && (
            <Button
              size='small'
              variant='contained'
              onClick={onClose}
              autoFocus
              sx={{ color: 'common.white' }}
            >
              OK
            </Button>
          )}
          {onRetry && (
            <Button
              onClick={onRetry}
              variant='contained'
              size='small'
              disabled={loading}
              sx={{ color: 'common.white' }}
            >
              {loading ? buttonTextLoading : buttonText}
            </Button>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default ErrorResponse;
