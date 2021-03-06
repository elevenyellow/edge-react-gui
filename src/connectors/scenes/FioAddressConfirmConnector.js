// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { connect } from 'react-redux'

import { createCurrencyWallet } from '../../actions/CreateWalletActions.js'
import type { DispatchProps, StateProps } from '../../components/scenes/FioAddressConfirmScene'
import { FioAddressConfirmScene } from '../../components/scenes/FioAddressConfirmScene'
import { getAccount, isConnectedState } from '../../modules/Core/selectors'
import * as SETTINGS_SELECTORS from '../../modules/Settings/selectors'
import { getFioWallets } from '../../modules/UI/selectors'
import type { Dispatch, State } from '../../types/reduxTypes'

const mapStateToProps = (state: State) => {
  const { fioAddress } = state.ui.scenes
  const fioWallets: EdgeCurrencyWallet[] = getFioWallets(state)
  const account = getAccount(state)
  const defaultFiatCode = SETTINGS_SELECTORS.getDefaultIsoFiat(state)

  const out: StateProps = {
    fioAddressName: fioAddress.fioAddressName,
    account,
    fioWallets,
    defaultFiatCode,
    isConnected: isConnectedState(state)
  }
  return out
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  createCurrencyWallet: (walletName: string, walletType: string, fiatCurrencyCode: string) =>
    dispatch(createCurrencyWallet(walletName, walletType, fiatCurrencyCode, false, false)),
  changeConfirmSelectedWallet: (selectedWallet: EdgeCurrencyWallet | null, expiration: string, feeCollected: number) =>
    dispatch({
      type: 'FIO/FIO_ADDRESS_UPDATE_SELECTED_WALLET',
      data: { selectedWallet, expiration, feeCollected }
    })
})

export const FioAddressConfirmConnector = connect(
  mapStateToProps,
  mapDispatchToProps
)(FioAddressConfirmScene)
