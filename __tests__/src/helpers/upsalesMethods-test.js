const {
  isApiUser,
  getCfValue,
  getCfValueByAlias,
  setCfValue,
} = require("../../../src/helpers/upsalesMethods");

describe("src/helpers/upsalesMethods", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("isApiUser", () => {
    it("should be false for non api email", () => {
      const req = {
        body: {
          user: {
            email: "test@test.com",
          },
        },
      };
      expect(isApiUser(req)).toBe(false);
    });
    it("should be true for api email", () => {
      const req = {
        body: {
          user: {
            email: "test@api.upsales.com",
          },
        },
      };
      expect(isApiUser(req)).toBe(true);
    });
  });

  describe("getCfValue", () => {
    it("should throw if missing entity", () => {
      expect(() => getCfValue({})).toThrow(
        "Parameter upsalesEntity is required"
      );
    });
    it("should throw if missing fieldId", () => {
      expect(() => getCfValue({ upsalesEntity: {} })).toThrow(
        "Parameter fieldId is required"
      );
    });
    it("should return null if entity has no custom array", () => {
      expect(getCfValue({ upsalesEntity: {}, fieldId: 1 })).toBe(null);
    });
    it("should return null if entity has no custom field", () => {
      expect(
        getCfValue({
          upsalesEntity: {
            custom: [],
          },
          fieldId: 1,
        })
      ).toBe(null);
    });
    it("should return value if it exists", () => {
      expect(
        getCfValue({
          upsalesEntity: {
            custom: [
              {
                fieldId: 1,
                value: "hello",
              },
            ],
          },
          fieldId: 1,
        })
      ).toBe("hello");
    });
  });

  describe("getCfValueByAlias", () => {
    it("should throw if missing entity", () => {
      expect(() => getCfValueByAlias({})).toThrow(
        "Parameter upsalesEntity is required"
      );
    });
    it("should throw if missing fieldId", () => {
      expect(() => getCfValueByAlias({ upsalesEntity: {} })).toThrow(
        "Parameter alias is required"
      );
    });
    it("should return null if entity has no custom array", () => {
      expect(getCfValueByAlias({ upsalesEntity: {}, alias: "ID" })).toBe(null);
    });
    it("should return null if entity has no custom field", () => {
      expect(
        getCfValueByAlias({
          upsalesEntity: {
            custom: [],
          },
          alias: "ID",
        })
      ).toBe(null);
    });
    it("should return value if it exists", () => {
      expect(
        getCfValueByAlias({
          upsalesEntity: {
            custom: [
              {
                alias: "ID",
                value: "hello",
              },
            ],
          },
          alias: "ID",
        })
      ).toBe("hello");
    });
  });

  describe("setCfValue", () => {
    it("should throw if missing entity", () => {
      expect(() => setCfValue({})).toThrow(
        "Parameter upsalesEntity is required"
      );
    });
    it("should throw if missing fieldId", () => {
      expect(() => setCfValue({ upsalesEntity: {} })).toThrow(
        "Parameter fieldId is required"
      );
    });
    it("should throw if missing value", () => {
      expect(() => setCfValue({ upsalesEntity: {}, fieldId: 1 })).toThrow(
        "Parameter value is required"
      );
    });
    it("should set custom field if entity has no custom array", () => {
      const entity = {};
      setCfValue({ upsalesEntity: entity, fieldId: 1, value: "apple" });
      expect(entity.custom).toEqual([
        {
          fieldId: 1,
          value: "apple",
        },
      ]);
    });
    it("should update field if it exists", () => {
      const entity = {
        custom: [
          {
            fieldId: 1,
            value: "orange",
          },
        ],
      };
      setCfValue({ upsalesEntity: entity, fieldId: 1, value: "apple" });
      expect(entity.custom).toEqual([
        {
          fieldId: 1,
          value: "apple",
        },
      ]);
    });
  });
});
