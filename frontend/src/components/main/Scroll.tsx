import { Box, styled } from '@mui/material';
import React, { useCallback, useEffect, useRef } from 'react';

interface ScrollProps {
  children: React.ReactNode;
}

const ScrollContainer = styled(Box)(() => ({
  height: `calc(100vh - 100px)`,
  overflowY: 'scroll',
}));

const Scroll = ({ children }: ScrollProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom, children]);

  return (
    <ScrollContainer ref={scrollRef} sx={{scrollBehavior: 'smooth'}}>
      <div>
        {children}
      </div>
    </ScrollContainer>
  );
};

export default Scroll;
