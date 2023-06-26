import { Box, styled } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';

interface ScrollProps {
  children: React.ReactNode;
  sentNewMessage: boolean;
}

const ScrollContainer = styled(Box)(() => ({
  height: `calc(100vh - 100px)`,
  overflowY: 'scroll',
}));

const Scroll = ({ children, sentNewMessage }: ScrollProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [children]);

  return (
    <ScrollContainer ref={scrollRef} sx={{ scrollBehavior: sentNewMessage ? 'smooth' : 'auto', height: '88%' }}>
      {children}
    </ScrollContainer>
  );
};

export default Scroll;
