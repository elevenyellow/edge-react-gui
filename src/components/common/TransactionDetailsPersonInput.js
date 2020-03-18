// @flow
import React, { Component } from 'react'
import { View, TextInput, TouchableWithoutFeedback } from 'react-native'
import s from '../../locales/strings.js'
import { type AirshipBridge, AirshipModal } from '../modals/modalParts'
import { sprintf } from 'sprintf-js'

import ContactSearchResults from './ContactSearchResults.js'
import { FormField } from '../common/FormField'
import FormattedText from '../../modules/UI/components/FormattedText/index'
import styles, { materialInput } from '../../styles/scenes/TransactionDetailsStyle'

import type { GuiContact } from '../../types/types.js'

type Props = {
  bridge: AirshipBridge<null>,
  personStatus: string,
  personName: string,
  contacts: Array<GuiContact>,
  onChangePerson: (string, string) => void
}

type State = {
  personName: string
}

export class TransactionDetailsPersonInput extends Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = { personName: props.personName }
  }
  onChangePerson = (value: string) => {
    this.props.onChangePerson(value, '')
    this.setState({ personName: value })
  }
  onSelectPerson = (personName: string, thumbnail: string) => {
    this.props.onChangePerson(personName, thumbnail)
    this.setState({ personName: personName })
    this.props.bridge.resolve(null)
  }
  render() {
    const { bridge, personStatus, contacts } = this.props
    const { personName } = this.state
    const personStatusString = sprintf(s.strings.transaction_details_person_input, personStatus)
    return (
      <AirshipModal bridge={bridge} onCancel={() => bridge.resolve(null)}>
          <TouchableWithoutFeedback onPress={() => bridge.resolve(null)}>
            <View style={styles.airshipContainer}>
              <FormattedText style={styles.airshipHeader}>{personStatusString}</FormattedText>
                <FormField
                  autoFocus
                  autoCorrect={false}
                  autoCapitalize="words"
                  returnKeyLabel={"done"}
                  returnKeyType={"done"}
                  label={personStatusString}
                  onChangeText={this.onChangePerson}
                  value={personName}
                  style={materialInput}
                />
                <ContactSearchResults
                  contacts={contacts}
                  currentPayeeText={personName}
                  onSelectPayee={this.onSelectPerson}
                />
            </View>
          </TouchableWithoutFeedback>
      </AirshipModal>
    )
  }
}
