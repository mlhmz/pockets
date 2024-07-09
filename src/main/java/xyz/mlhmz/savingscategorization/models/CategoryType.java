package xyz.mlhmz.savingscategorization.models;

import java.util.Arrays;

public enum CategoryType {
    VACATION("Urlaub", "Reise"),
    LIABILITY("Hausrat", "Haftpflicht"),
    GAS("Gas"),
    CAR_INSURANCE("Auto"),
    PUBLIC_BROADCAST("Rundfunk", "GEZ"),
    NO_CATEGORY
    ;

    private final String[] keywords;

    CategoryType(String... keywords) {
        this.keywords = keywords;
    }

    public static CategoryType detectByString(String value) {
        CategoryType[] categories = CategoryType.values();

        for (CategoryType categoryType : categories) {
            if (NO_CATEGORY == categoryType) {
                continue;
            }
            if (Arrays.stream(categoryType.keywords).anyMatch(keyword -> value.toLowerCase().contains(keyword.toLowerCase()))) {
                return categoryType;
            }
        }
        return NO_CATEGORY;
    }
}
