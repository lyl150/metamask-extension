import { TransactionMeta } from '@metamask/transaction-controller';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  AvatarToken,
  AvatarTokenSize,
  Box,
  Text,
} from '../../../../../../../components/component-library';
import {
  AlignItems,
  BackgroundColor,
  Display,
  FlexDirection,
  JustifyContent,
  TextColor,
  TextVariant,
} from '../../../../../../../helpers/constants/design-system';
import { getWatchedToken } from '../../../../../../../selectors';
import { MultichainState } from '../../../../../../../selectors/multichain';
import { useConfirmContext } from '../../../../../context/confirm';
import { useTokenDetails } from '../../hooks/useTokenDetails';
import { useTokenValues } from '../../hooks/use-token-values';
import { ConfirmLoader } from '../confirm-loader/confirm-loader';

const SendHeading = () => {
  const { currentConfirmation: transactionMeta } =
    useConfirmContext<TransactionMeta>();
  const selectedToken = useSelector((state: MultichainState) =>
    getWatchedToken(transactionMeta)(state),
  );
  const { tokenImage, tokenSymbol } = useTokenDetails(
    transactionMeta,
    selectedToken,
  );
  const { decodedTransferValue, fiatDisplayValue, pending } =
    useTokenValues(transactionMeta);

  const TokenImage = (
    <AvatarToken
      src={tokenImage}
      name={selectedToken?.symbol}
      size={AvatarTokenSize.Xl}
      backgroundColor={
        selectedToken?.symbol
          ? BackgroundColor.backgroundDefault
          : BackgroundColor.overlayDefault
      }
      color={
        selectedToken?.symbol ? TextColor.textDefault : TextColor.textMuted
      }
    />
  );

  const TokenValue = (
    <>
      <Text
        variant={TextVariant.headingLg}
        color={TextColor.inherit}
        marginTop={3}
      >{`${decodedTransferValue || ''} ${tokenSymbol}`}</Text>
      {fiatDisplayValue && (
        <Text variant={TextVariant.bodyMd} color={TextColor.textAlternative}>
          {fiatDisplayValue}
        </Text>
      )}
    </>
  );

  if (pending) {
    return <ConfirmLoader />;
  }

  return (
    <Box
      display={Display.Flex}
      flexDirection={FlexDirection.Column}
      justifyContent={JustifyContent.center}
      alignItems={AlignItems.center}
      padding={4}
    >
      {TokenImage}
      {TokenValue}
    </Box>
  );
};

export default SendHeading;
