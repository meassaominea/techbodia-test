import { Box, Typography, alpha, useTheme } from '@mui/material';
import { BoxRemove } from 'iconsax-react';

const EmptyResponse = ({
  disableBackground = false,
  height = 'auto',
  width = 'auto',
  title = 'No Data',
  flexGrow = false,
  icons,
}: {
  height?: string | number;
  width?: string | number;
  title?: string;
  icons?: React.ReactNode;
  disableBackground?: boolean;
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
          p: disableBackground ? 0 : 2,
          background: disableBackground ? 'transparent' : alpha(theme.palette.error.light, 0.25),
          borderRadius: 2,
          minWidth: disableBackground ? 'auto' : 200,
          maxWidth: 300,
          minHeight: disableBackground ? 'auto' : 150,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {icons || <BoxRemove variant='Bulk' size={50} color={theme.palette.error.main} />}
        <Typography fontWeight='bold' color='error' textAlign='center' mt={1}>
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default EmptyResponse;
