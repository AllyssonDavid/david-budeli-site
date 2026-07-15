'use client';
import styled from 'styled-components';

const BrandImage = styled.img`
  width: ${({ $width }) => $width || '40px'};
  height: auto;
  object-fit: contain;
  border-radius: 8px;
  transition: transform 0.3s ease;
`;

export default function Logo({ width, className }) {
    return (
        <BrandImage
            className={className}
            $width={width}
            src="/brand/db-monogram.png"
            alt="David Budeli"
        />
    );
}
