import { FormEvent, useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  ClipboardCheck,
  GraduationCap,
  Landmark,
  LogIn,
  LogOut,
  NotebookTabs,
  RotateCcw,
  Save,
  ShieldAlert,
  UserRound,
} from "lucide-react";

const login = {
  username: "admin",
  password: "admin123",
};

type IconType = typeof UserRound;

type FieldType =
  | "text"
  | "date"
  | "number"
  | "email"
  | "tel"
  | "textarea"
  | "select"
  | "radio"
  | "checkbox"
  | "file";

type FieldOption = {
  label: string;
  value: string;
};

type Field = {
  id: string;
  label: string;
  type?: FieldType;
  placeholder?: string;
  options?: FieldOption[];
  full?: boolean;
  multiple?: boolean;
  accept?: string;
};

type Section = {
  id: string;
  title: string;
  eyebrow: string;
  icon: IconType;
  fields?: Field[];
};

const titleOptions = [
  { label: "นาย", value: "mr" },
  { label: "นาง", value: "mrs" },
  { label: "นางสาว", value: "ms" },
];

const genderOptions = [
  { label: "ชาย", value: "male" },
  { label: "หญิง", value: "female" },
];

const maritalOptions = [
  { label: "โสด", value: "single" },
  { label: "สมรส", value: "married" },
  { label: "หย่า", value: "divorced" },
];

const employmentOptions = [
  { label: "รายเดือน", value: "monthly" },
  { label: "รายวัน", value: "daily" },
];

const paymentOptions = [
  { label: "โอนผ่านธนาคาร", value: "bank_transfer" },
  { label: "เงินสด", value: "cash" },
];

const companyOptions = [
  { label: "บริษัท วีชมาร์ต จำกัด", value: "vechmart" },
  { label: "บริษัท ซี.วี. 928 จำกัด", value: "cv928" },
  { label: "บริษัท วีชเบสท์ จำกัด", value: "vechbest" },
];

const activityOptions = [
  { label: "วีชมาร์ต (VCM)", value: "vcm" },
  { label: "วีชเบสท์ (VCB)", value: "vcb" },
  { label: "ซี.วี. 928 (หลาดหลุมแก้ว)", value: "cv928_latlumkaeo" },
  { label: "ซี.วี. 928 (คลองข่อย)", value: "cv928_khlongkhoi" },
];

const punishmentOptions = [
  { label: "ออกใบเตือน", value: "warning_letter" },
  { label: "ตัดเงิน", value: "salary_deduction" },
  { label: "พักงาน", value: "suspension" },
  { label: "ให้ออก", value: "termination" },
];

const generalFields: Field[] = [
  { id: "employeeId", label: "รหัสพนักงาน", placeholder: "เช่น VCM-001" },
  { id: "wage", label: "ค่าจ้าง", type: "number", placeholder: "0.00" },
  { id: "wageDate", label: "วัน/เดือน", type: "date" },
  { id: "title", label: "คำนำหน้า", type: "radio", options: titleOptions },
  { id: "fullName", label: "ชื่อ-นามสกุล", placeholder: "ชื่อและนามสกุล" },
  { id: "nickname", label: "ชื่อเล่น" },
  { id: "gender", label: "เพศ", type: "radio", options: genderOptions },
  { id: "maritalStatus", label: "สถานภาพ", type: "select", options: maritalOptions },
  { id: "nationality", label: "สัญชาติ", placeholder: "ใส่ได้มากกว่า 1" },
  { id: "employeePhoto", label: "รูปพนักงาน", type: "file", accept: "image/*" },
  { id: "idCardNumber", label: "เลขประจำตัวประชาชน" },
  { id: "passportNumber", label: "เลขที่หนังสือเดินทาง (Passport)" },
  { id: "address1", label: "ที่อยู่ 1", type: "textarea", full: true },
  { id: "address2", label: "ที่อยู่ 2", type: "textarea", full: true },
  { id: "province", label: "จังหวัด" },
  { id: "idCardPhoto", label: "รูปบัตรประชาชน", type: "file", accept: "image/*,application/pdf" },
  { id: "phone", label: "Tel.", type: "tel" },
  { id: "lineInstagram", label: "LineID / Instagram" },
  { id: "position", label: "ตำแหน่ง" },
  { id: "department", label: "แผนก" },
  { id: "employmentType", label: "ประเภทการจ้างงาน", type: "radio", options: employmentOptions },
  { id: "startDate", label: "วันที่เริ่มงาน", type: "date" },
  { id: "endDate", label: "วันที่พ้นสภาพ", type: "date" },
  { id: "applicationPdf", label: "ใบสมัครงาน (PDF)", type: "file", accept: "application/pdf" },
  { id: "education", label: "วุฒิการศึกษา" },
  { id: "company", label: "บริษัทที่ทำงาน", type: "select", options: companyOptions },
  { id: "employmentContract", label: "สัญญาจ้างงาน (PDF)", type: "file", accept: "application/pdf", multiple: true },
  { id: "socialSecurityDate", label: "วันที่เข้าประกันสังคม", type: "date" },
  { id: "medicalBenefit", label: "สิทธิรักษาพยาบาล / โรงพยาบาล", placeholder: "ใส่ได้มากกว่า 1" },
];

const warningFields: Field[] = [
  { id: "warningDate", label: "วันที่", type: "date" },
  { id: "warningEvent", label: "เหตุการณ์", type: "textarea", full: true },
  { id: "punishment", label: "การทำโทษ", type: "checkbox", options: punishmentOptions, full: true },
  { id: "warningPdf", label: "ใบเตือน (PDF)", type: "file", accept: "application/pdf" },
];

const accidentFields: Field[] = [
  { id: "accidentDate", label: "วันที่", type: "date" },
  { id: "accidentEvent", label: "เหตุการณ์", type: "textarea", full: true },
  { id: "accidentAction", label: "การดำเนินการ", type: "textarea", full: true },
];

const trainingFields: Field[] = [
  { id: "trainingDate", label: "วันที่อบรม", type: "date" },
  { id: "courseName", label: "ชื่อหลักสูตร" },
  { id: "certificatePdf", label: "ใบประกาศ", type: "file", accept: "application/pdf" },
  { id: "trainer", label: "วิทยากรผู้อบรม" },
  { id: "trainingPlace", label: "สถานที่อบรม" },
  { id: "profilePdf", label: "Profile (PDF)", type: "file", accept: "application/pdf" },
];

const payrollFields: Field[] = [
  { id: "paymentType", label: "ประเภทการจ่ายเงิน", type: "radio", options: paymentOptions },
  { id: "bankName", label: "ชื่อธนาคาร" },
  { id: "bankAccount", label: "เลขบัญชีธนาคาร" },
  { id: "activities", label: "กิจกรรม / บริษัท", type: "checkbox", options: activityOptions, full: true },
];

const companyFields: Field[] = [
  { id: "companyName", label: "ชื่อบริษัท" },
  { id: "companyPhone", label: "Tel.ติดต่อ", type: "tel" },
  { id: "companyAddress1", label: "ที่อยู่ 1", type: "textarea", full: true },
  { id: "companyAddress2", label: "ที่อยู่ 2", type: "textarea", full: true },
  { id: "companyProvince", label: "จังหวัด" },
  { id: "rulesPdf", label: "ระเบียบ / กฎระเบียบ", type: "file", accept: "application/pdf" },
  { id: "mapPdf", label: "แผ่นที่ (PDF)", type: "file", accept: "application/pdf" },
  { id: "tradeRegistrationPdf", label: "ทะเบียนการค้า (PDF)", type: "file", accept: "application/pdf" },
  { id: "factoryRegistrationPdf", label: "ทะเบียนโรงงาน (PDF)", type: "file", accept: "application/pdf" },
  { id: "license1Pdf", label: "ใบอนุญาต 1", type: "file", accept: "application/pdf" },
  { id: "license2Pdf", label: "ใบอนุญาต 2", type: "file", accept: "application/pdf" },
];

const reportFields: Field[] = [
  { id: "reportEmployeeId", label: "รหัสพนักงาน" },
  { id: "reportName", label: "ชื่อ-สกุล" },
  { id: "reportYear", label: "พ.ศ." },
  { id: "reportMonth", label: "เดือน" },
  { id: "employmentAge", label: "อายุงาน" },
];

const sections: Section[] = [
  {
    id: "general",
    title: "ข้อมูลทั่วไป",
    eyebrow: "Personnel profile",
    icon: UserRound,
    fields: generalFields,
  },
  {
    id: "work",
    title: "ข้อมูลการทำงาน",
    eyebrow: "Attendance and pay",
    icon: BriefcaseBusiness,
  },
  {
    id: "warnings",
    title: "ข้อบกพร่องในการทำงาน",
    eyebrow: "Warnings",
    icon: ShieldAlert,
    fields: warningFields,
  },
  {
    id: "accidents",
    title: "การประสบอุบัติเหตุ",
    eyebrow: "Incidents",
    icon: ClipboardCheck,
    fields: accidentFields,
  },
  {
    id: "training",
    title: "การอบรม",
    eyebrow: "Training",
    icon: GraduationCap,
    fields: trainingFields,
  },
  {
    id: "payroll",
    title: "การรับเงินเดือน/ค่าจ้าง",
    eyebrow: "Payment",
    icon: Landmark,
    fields: payrollFields,
  },
  {
    id: "company",
    title: "ข้อมูลบริษัท",
    eyebrow: "Company",
    icon: Building2,
    fields: companyFields,
  },
  {
    id: "notes",
    title: "หมายเหตุ",
    eyebrow: "Notes",
    icon: NotebookTabs,
  },
  {
    id: "reports",
    title: "รายงาน",
    eyebrow: "Reports",
    icon: CalendarDays,
    fields: reportFields,
  },
];

const workMetricFields = [
  { id: "workDays", label: "จำนวนวันทำงาน" },
  { id: "sickLeave", label: "ลาป่วย" },
  { id: "personalLeave", label: "ลากิจ" },
  { id: "unpaidLeave", label: "ลากิจไม่รับค่าจ้าง" },
  { id: "vacation", label: "พักผ่อน" },
  { id: "maternityLeave", label: "ลาคลอด" },
  { id: "absence", label: "ขาดงาน" },
  { id: "late", label: "มาสาย" },
  { id: "salary", label: "เงินเดือน" },
  { id: "wageAmount", label: "ค่าจ้าง" },
  { id: "attendanceBonus", label: "เบี้ยขยัน" },
  { id: "specialAllowance", label: "เงินเพิ่มพิเศษ" },
];

const years = ["2565", "2566", "2567"];

const initialValues = [
  ...generalFields,
  ...warningFields,
  ...accidentFields,
  ...trainingFields,
  ...payrollFields,
  ...companyFields,
  ...reportFields,
].reduce<Record<string, string | string[]>>((values, field) => {
  values[field.id] = field.type === "checkbox" ? [] : "";
  return values;
}, {});

const initialWorkRows = years.map((year) => ({
  year,
  month: "",
  employeeWorkCode: "",
  workDays: "",
  sickLeave: "",
  personalLeave: "",
  unpaidLeave: "",
  vacation: "",
  maternityLeave: "",
  absence: "",
  late: "",
  salary: "",
  wageAmount: "",
  attendanceBonus: "",
  specialAllowance: "",
}));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [formValues, setFormValues] = useState(initialValues);
  const [workRows, setWorkRows] = useState(initialWorkRows);
  const [reportRows, setReportRows] = useState(initialWorkRows);
  const [savedAt, setSavedAt] = useState("");

  const filledCount = useMemo(() => {
    return Object.values(formValues).filter((value) =>
      Array.isArray(value) ? value.length > 0 : value.trim().length > 0,
    ).length;
  }, [formValues]);

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loginForm.username === login.username && loginForm.password === login.password) {
      setIsAuthenticated(true);
      setLoginError("");
      return;
    }

    setLoginError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
  }

  function handleFieldChange(field: Field, value: string, checked?: boolean) {
    if (field.type === "checkbox") {
      setFormValues((current) => {
        const currentValue = current[field.id];
        const existing = Array.isArray(currentValue) ? currentValue : [];
        return {
          ...current,
          [field.id]: checked ? [...existing, value] : existing.filter((item) => item !== value),
        };
      });
      return;
    }

    setFormValues((current) => ({
      ...current,
      [field.id]: value,
    }));
  }

  function handleFileChange(field: Field, files: FileList | null) {
    const fileNames = files ? Array.from(files).map((file) => file.name).join(", ") : "";

    setFormValues((current) => ({
      ...current,
      [field.id]: fileNames,
    }));
  }

  function handleMetricChange(
    table: "work" | "report",
    rowIndex: number,
    key: string,
    value: string,
  ) {
    const updater = table === "work" ? setWorkRows : setReportRows;

    updater((currentRows) =>
      currentRows.map((row, index) =>
        index === rowIndex
          ? {
              ...row,
              [key]: value,
            }
          : row,
      ),
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload = {
      ...formValues,
      workHistory: workRows,
      companyWorkTimeReport: reportRows,
    };

    console.log("Personnel registration payload", payload);
    setSavedAt(new Intl.DateTimeFormat("th-TH", { dateStyle: "medium", timeStyle: "short" }).format(new Date()));
  }

  function handleReset() {
    setFormValues(initialValues);
    setWorkRows(initialWorkRows);
    setReportRows(initialWorkRows);
    setSavedAt("");
  }

  if (!isAuthenticated) {
    return (
      <main className="login-page">
        <section className="login-panel" aria-labelledby="login-title">
          <div className="brand-lockup">
            <span className="brand-mark">V</span>
            <div>
              <p>Vechmart HRMS</p>
              <h1 id="login-title">ทะเบียนบุคคล</h1>
            </div>
          </div>

          <form className="login-form" onSubmit={handleLogin}>
            <label>
              ชื่อผู้ใช้
              <input
                value={loginForm.username}
                onChange={(event) => setLoginForm((current) => ({ ...current, username: event.target.value }))}
                autoComplete="username"
              />
            </label>
            <label>
              รหัสผ่าน
              <input
                type="password"
                value={loginForm.password}
                onChange={(event) => setLoginForm((current) => ({ ...current, password: event.target.value }))}
                autoComplete="current-password"
              />
            </label>
            {loginError ? <p className="form-error">{loginError}</p> : null}
            <button className="primary-button" type="submit">
              <LogIn aria-hidden="true" size={18} />
              เข้าสู่ระบบ
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-lockup compact">
          <span className="brand-mark">V</span>
          <div>
            <p>Vechmart HRMS</p>
            <h1>ทะเบียนบุคคล</h1>
          </div>
        </div>
        <div className="topbar-actions">
          <span className="status-pill">{filledCount} fields filled</span>
          <button className="ghost-button" type="button" onClick={() => setIsAuthenticated(false)}>
            <LogOut aria-hidden="true" size={18} />
            ออกจากระบบ
          </button>
        </div>
      </header>

      <div className="workspace">
        <aside className="section-nav" aria-label="Sections">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <a key={section.id} href={`#${section.id}`}>
                <Icon aria-hidden="true" size={17} />
                <span>{section.title}</span>
              </a>
            );
          })}
        </aside>

        <form className="record-form" onSubmit={handleSubmit}>
          {sections.map((section) => (
            <FormSection key={section.id} section={section}>
              {section.id === "work" ? (
                <MetricsTable
                  caption="ข้อมูลการทำงาน"
                  rows={workRows}
                  onChange={(rowIndex, key, value) => handleMetricChange("work", rowIndex, key, value)}
                />
              ) : section.id === "notes" ? (
                <label className="field full">
                  หมายเหตุ
                  <textarea
                    value={(formValues.notes as string) ?? ""}
                    onChange={(event) =>
                      setFormValues((current) => ({
                        ...current,
                        notes: event.target.value,
                      }))
                    }
                    rows={5}
                  />
                </label>
              ) : (
                <div className="field-grid">
                  {section.fields?.map((field) => (
                    <FieldControl
                      key={field.id}
                      field={field}
                      value={formValues[field.id]}
                      onChange={handleFieldChange}
                      onFileChange={handleFileChange}
                    />
                  ))}
                  {section.id === "reports" ? (
                    <div className="full">
                      <MetricsTable
                        caption="เวลาทำงานของบริษัท"
                        rows={reportRows}
                        onChange={(rowIndex, key, value) => handleMetricChange("report", rowIndex, key, value)}
                      />
                    </div>
                  ) : null}
                </div>
              )}
            </FormSection>
          ))}

          <footer className="form-actions">
            <div>{savedAt ? <span>Logged at {savedAt}</span> : <span>Ready to log locally</span>}</div>
            <button className="ghost-button" type="button" onClick={handleReset}>
              <RotateCcw aria-hidden="true" size={18} />
              ล้างข้อมูล
            </button>
            <button className="primary-button" type="submit">
              <Save aria-hidden="true" size={18} />
              บันทึก Log
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}

type FormSectionProps = {
  section: Section;
  children: React.ReactNode;
};

function FormSection({ section, children }: FormSectionProps) {
  const Icon = section.icon;

  return (
    <section className="form-section" id={section.id} aria-labelledby={`${section.id}-title`}>
      <header className="section-heading">
        <div className="section-icon">
          <Icon aria-hidden="true" size={20} />
        </div>
        <div>
          <p>{section.eyebrow}</p>
          <h2 id={`${section.id}-title`}>{section.title}</h2>
        </div>
      </header>
      {children}
    </section>
  );
}

type FieldControlProps = {
  field: Field;
  value: string | string[];
  onChange: (field: Field, value: string, checked?: boolean) => void;
  onFileChange: (field: Field, files: FileList | null) => void;
};

function FieldControl({ field, value, onChange, onFileChange }: FieldControlProps) {
  const className = field.full ? "field full" : "field";

  if (field.type === "textarea") {
    return (
      <label className={className}>
        {field.label}
        <textarea
          value={typeof value === "string" ? value : ""}
          onChange={(event) => onChange(field, event.target.value)}
          placeholder={field.placeholder}
          rows={3}
        />
      </label>
    );
  }

  if (field.type === "select") {
    return (
      <label className={className}>
        {field.label}
        <select value={typeof value === "string" ? value : ""} onChange={(event) => onChange(field, event.target.value)}>
          <option value="">เลือกข้อมูล</option>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (field.type === "radio" || field.type === "checkbox") {
    const selectedValues = Array.isArray(value) ? value : [];

    return (
      <fieldset className={className}>
        <legend>{field.label}</legend>
        <div className="choice-row">
          {field.options?.map((option) => (
            <label key={option.value} className="choice">
              <input
                type={field.type}
                name={field.id}
                value={option.value}
                checked={field.type === "radio" ? value === option.value : selectedValues.includes(option.value)}
                onChange={(event) => onChange(field, option.value, event.target.checked)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
    );
  }

  if (field.type === "file") {
    return (
      <label className={className}>
        {field.label}
        <input
          type="file"
          accept={field.accept}
          multiple={field.multiple}
          onChange={(event) => onFileChange(field, event.target.files)}
        />
        {value ? <span className="file-name">{value}</span> : null}
      </label>
    );
  }

  return (
    <label className={className}>
      {field.label}
      <input
        type={field.type ?? "text"}
        value={typeof value === "string" ? value : ""}
        onChange={(event) => onChange(field, event.target.value)}
        placeholder={field.placeholder}
      />
    </label>
  );
}

type WorkRow = (typeof initialWorkRows)[number];

type MetricsTableProps = {
  caption: string;
  rows: WorkRow[];
  onChange: (rowIndex: number, key: string, value: string) => void;
};

function MetricsTable({ caption, rows, onChange }: MetricsTableProps) {
  return (
    <div className="table-wrap">
      <table>
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th>ปี</th>
            <th>เดือน</th>
            <th>วันทำงาน (รหัสพนักงาน)</th>
            {workMetricFields.map((field) => (
              <th key={field.id}>{field.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={row.year}>
              <td>{row.year}</td>
              <td>
                <input
                  value={row.month}
                  onChange={(event) => onChange(rowIndex, "month", event.target.value)}
                  aria-label={`เดือน ${row.year}`}
                />
              </td>
              <td>
                <input
                  value={row.employeeWorkCode}
                  onChange={(event) => onChange(rowIndex, "employeeWorkCode", event.target.value)}
                  aria-label={`วันทำงานรหัสพนักงาน ${row.year}`}
                />
              </td>
              {workMetricFields.map((field) => (
                <td key={field.id}>
                  <input
                    type="number"
                    value={row[field.id as keyof WorkRow]}
                    onChange={(event) => onChange(rowIndex, field.id, event.target.value)}
                    aria-label={`${field.label} ${row.year}`}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
