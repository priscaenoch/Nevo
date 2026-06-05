use soroban_sdk::contracterror;

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum CrowdfundingError {
    CampaignNotFound = 1,
    InvalidInput = 2,
    PoolNotFound = 3,
    InvalidPoolState = 4,
    ContractPaused = 5,
    ContractNotInitialized = 6,
    Unauthorized = 7,
    TokenTransferFailed = 8,
    InsufficientBalance = 9,
    RefundNotAvailable = 10,
    ApplicationNotFound = 11,
    ApplicationAlreadySubmitted = 12,
    ApplicationAlreadyReviewed = 13,
    InvalidApplicationCredentials = 14,
    OracleUnauthorized = 15,
}

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum ValidationError {
    ApplicationNotFound = 1,
    ApplicationAlreadyProcessed = 2,
    ApplicationAlreadyExists = 3,
    PoolNotFound = 4,
    Unauthorized = 5,
}

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum SecondCrowdfundingError {
    StringTooLong = 1,
    EventNotFound = 2,
    EventSoldOut = 3,
    EventExpired = 4,
    InsufficientSponsorBalance = 5,
    ApplicationNotFound = 6,
    ApplicationAlreadySubmitted = 7,
    ApplicationAlreadyReviewed = 8,
    InvalidApplicationCredentials = 9,
}

#[cfg(test)]
mod tests {
    use super::SecondCrowdfundingError;

    #[test]
    fn event_not_found_discriminant() {
        assert_eq!(SecondCrowdfundingError::EventNotFound as u32, 2);
    }

    #[test]
    fn event_sold_out_discriminant() {
        assert_eq!(SecondCrowdfundingError::EventSoldOut as u32, 3);
    }

    #[test]
    fn event_expired_discriminant() {
        assert_eq!(SecondCrowdfundingError::EventExpired as u32, 4);
    }

    #[test]
    fn event_errors_are_distinct() {
        assert_ne!(
            SecondCrowdfundingError::EventNotFound,
            SecondCrowdfundingError::EventSoldOut
        );
        assert_ne!(
            SecondCrowdfundingError::EventSoldOut,
            SecondCrowdfundingError::EventExpired
        );
        assert_ne!(
            SecondCrowdfundingError::EventNotFound,
            SecondCrowdfundingError::EventExpired
        );
    }

    #[test]
    fn event_errors_ordering() {
        assert!(SecondCrowdfundingError::EventNotFound < SecondCrowdfundingError::EventSoldOut);
        assert!(SecondCrowdfundingError::EventSoldOut < SecondCrowdfundingError::EventExpired);
    }
}
