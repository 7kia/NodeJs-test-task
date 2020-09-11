import moment from "moment/moment";

export class Repository {
    /**
     * @return {string}
     */
    static generateNowTimeString() {
        return moment(new Date()).format("YYYY-MM-DD");
    }

    /**
     * @param {Object} data
     * @param {string} delimiter
     * @param {Function} generateValue: (key, value) => string
     * @return {string}
     */
    static generateListValues(
        data,
        delimiter,
        generateValue,
    ) {
        let criteriaString = "";
        for (const key in data) {
            if (criteriaString.length > 1) {
                criteriaString = criteriaString + delimiter;
            }
            criteriaString = criteriaString + generateValue(key, Repository.generateStringValue(data[key]));
        }
        return criteriaString;
    }

    /**
     * @param {any} value
     * @return {string|null}
     */
    static generateStringValue(value) {
        if (Array.isArray(value)) {
            /** @type {string} */
            let result = "{";
            for (const element of value) {
                if (result.length > 1) {
                    result = result + ", ";
                }
                result += element;
            }
            result += "}";
            return result;
        }
        if ((value === null) || (value === undefined)) {
            return null;
        }
        return value.toString();
    }

    /**
     * @param {string} searchPlace
     * @param {Object|string} criterion
     * @param {boolean} onlyOne
     * @return {string}
     */
    static getSelectQueueString(searchPlace,  criterion, onlyOne = false) {
        /** @type {string} */
        let criteriaString = Repository.setCriteriaString(criterion);
        /** @type {string} */
        let result = "SELECT * FROM public.\"" + searchPlace + "\" ";
        if (criteriaString) {
            result += "WHERE " + criteriaString;
        }
        if (onlyOne) {
            result += " LIMIT 1"
        }
        return result;
    }

    /**
     *
     * @param {Object|string} criterion
     * @return {string}
     */
    static setCriteriaString(criterion) {
        if (typeof (criterion) === "object") {
            return Repository.generateCriteriaString(criterion);
        } else {
            return criterion;
        }
    }

    /**
     *
     * @param {Object} criterion
     * @return {string}
     */
    static generateCriteriaString(criterion) {
        return Repository.generateListValues(
            criterion,
            " and ",
            (key, value) => {
                if (value) {
                    return key + "=\'" + value + "\'";
                }
                return key + "=null";
            },
        );
    }

    /**
     * @param {string} searchPlace
     * @return {string}
     */
    static getCheckTableExistingString(searchPlace) {
        return "SELECT * FROM public.\"" + searchPlace + "\" LIMIT 1";
    }

    /**
     * @param {Object} criterion
     * @return {string}
     */
    static generateNewDataString(criterion) {
        return Repository.generateListValues(
            criterion,
            ", ",
            (key, value) => {
                if (value) {
                    return key + "=\'" + value + "\'";
                }
                return key + "=null";
            },
        );
    }

    /**
     * @param {string} insertPlace
     * @param {Object} data
     * @param {boolean} returnId
     * @return {string}
     */
    static getInsertQueueString(
        insertPlace,
        data,
        returnId = false
    ) {
        const valueString = Repository.generateValueString(data);
        const propertyString = Repository.generatePropertyString(data);

        /** @type {string} */
        let result = "INSERT INTO public.\"" + insertPlace + "\"("
            + propertyString + ")"
            + "VALUES (" + valueString + ")";

        if (returnId) {
            result += " RETURNING id";
        }
        return result
    }
    /**
     * @param {Object} data
     * @return {string}
     */
    static generateValueString(data) {
        return Repository.generateListValues(
            data,
            ", ",
            (key, value) => {
                if (value) {
                    return "\'" + value + "\'";//
                }
                return "null";
            },
        );
    }

    /**
     * @param {Object} data
     * @return {string}
     */
    static generatePropertyString(data) {
        return Repository.generateListValues(
            data,
            ", ",
            (key, value) => {
                return key;
            },
        );
    }

    /**
     * @param {string} insertPlace
     * @param {Object} criterion
     * @return {string}
     */
    static getDeleteQueueString(
        insertPlace,
        criterion,
    ) {
        const criteriaString = Repository.generateCriteriaString(criterion);
        return "DELETE FROM public.\"" + insertPlace + "\" "
            + "WHERE " + criteriaString + "";
    }
    
    /**
     * @param {Client} connection
     */
    constructor(connection) {
        /** @protected {Client} */
        this.connection = connection;
    }
}
