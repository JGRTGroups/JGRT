import React, {
  useState,
  useRef,
  useEffect,
  MouseEvent,
  TouchEvent,
} from "react";
import { Calculator, Move, Minus, DollarSign, Square } from "lucide-react";

// EMI Calculator Types
interface EmiResult {
  emi: string;
  totalAmount: string;
  totalInterest: string;
}

interface EmiData {
  principal: string;
  rate: string;
  tenure: string;
  result: EmiResult | null;
}

// Area Calculator Types
type Shape = "rectangle" | "square" | "circle" | "triangle";

interface Dimensions {
  length?: number;
  width?: number;
  radius?: number;
  base?: number;
  height?: number;
  side?: number;
}

interface AreaData {
  shape: Shape;
  dimensions: Dimensions;
  result: string | null;
}

type FloatingCalculatorProps = {
  isMinimized: boolean;
  setIsMinimized: React.Dispatch<React.SetStateAction<boolean>>;
};

// Component
export default function FloatingCalculator({
    isMinimized,
  setIsMinimized,
}: FloatingCalculatorProps) {
  const [activeTab, setActiveTab] = useState<"emi" | "area">("emi");
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 50,
    y: 50,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const calculatorRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // EMI Calculator State
  const [emiData, setEmiData] = useState<EmiData>({
    principal: "",
    rate: "",
    tenure: "",
    result: null,
  });

  // Area Calculator State
  const [areaData, setAreaData] = useState<AreaData>({
    shape: "rectangle",
    dimensions: {},
    result: null,
  });

  // Update Position (drag)
  const updatePosition = (clientX: number, clientY: number) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const newX = clientX - dragOffset.x;
      const newY = clientY - dragOffset.y;

      const maxX =
        window.innerWidth - (calculatorRef.current?.offsetWidth || 384);
      const maxY =
        window.innerHeight - (calculatorRef.current?.offsetHeight || 400);

      setPosition({
        x: Math.max(0, Math.min(maxX, newX)),
        y: Math.max(0, Math.min(maxY, newY)),
      });
    });
  };

  // Mouse Handlers
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest(".no-drag")) return;

    e.preventDefault();
    setIsDragging(true);

    const rect = calculatorRef.current?.getBoundingClientRect();
    if (!rect) return;

    setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: MouseEvent<Document>) => {
    if (!isDragging) return;
    e.preventDefault();
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    updatePosition(e.clientX, e.clientY);
  };

  const handleMouseUp = (e: MouseEvent<Document>) => {
    e.preventDefault();
    setIsDragging(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };

  // Touch Handlers
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest(".no-drag")) return;
    e.preventDefault();

    const touch = e.touches[0];
    const rect = calculatorRef.current?.getBoundingClientRect();
    if (!rect) return;

    setIsDragging(true);
    setDragOffset({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    });
  };

  const handleTouchMove = (e: TouchEvent<Document>) => {
    if (!isDragging) return;
    e.preventDefault();

    const touch = e.touches[0];
    updatePosition(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = (e: TouchEvent<Document>) => {
    e.preventDefault();
    setIsDragging(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };

  // Global Event Listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener(
        "mousemove",
        handleMouseMove as unknown as EventListener,
        { passive: false },
      );
      document.addEventListener(
        "mouseup",
        handleMouseUp as unknown as EventListener,
        { passive: false },
      );
      document.addEventListener(
        "touchmove",
        handleTouchMove as unknown as EventListener,
        { passive: false },
      );
      document.addEventListener(
        "touchend",
        handleTouchEnd as unknown as EventListener,
        { passive: false },
      );

      document.body.style.userSelect = "none";
      document.body.style.cursor = "grabbing";
      document.body.style.overflow = "hidden";

      return () => {
        document.removeEventListener(
          "mousemove",
          handleMouseMove as unknown as EventListener,
        );
        document.removeEventListener(
          "mouseup",
          handleMouseUp as unknown as EventListener,
        );
        document.removeEventListener(
          "touchmove",
          handleTouchMove as unknown as EventListener,
        );
        document.removeEventListener(
          "touchend",
          handleTouchEnd as unknown as EventListener,
        );

        document.body.style.userSelect = "";
        document.body.style.cursor = "";
        document.body.style.overflow = "";
      };
    }
  }, [isDragging]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // EMI Calculation
  const calculateEMI = () => {
    const P = parseFloat(emiData.principal);
    const R = parseFloat(emiData.rate) / 12 / 100;
    const N = parseFloat(emiData.tenure) * 12;

    if (!P || !R || !N) return;

    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalAmount = emi * N;
    const totalInterest = totalAmount - P;

    setEmiData((prev) => ({
      ...prev,
      result: {
        emi: emi.toFixed(2),
        totalAmount: totalAmount.toFixed(2),
        totalInterest: totalInterest.toFixed(2),
      },
    }));
  };

  // Area Calculation
  const calculateArea = () => {
    const { shape, dimensions } = areaData;
    let area = 0;

    switch (shape) {
      case "rectangle":
        area = (dimensions.length ?? 0) * (dimensions.width ?? 0);
        break;
      case "circle":
        area = Math.PI * Math.pow(dimensions.radius ?? 0, 2);
        break;
      case "triangle":
        area = 0.5 * (dimensions.base ?? 0) * (dimensions.height ?? 0);
        break;
      case "square":
        area = Math.pow(dimensions.side ?? 0, 2);
        break;
    }

    setAreaData((prev) => ({
      ...prev,
      result: area.toFixed(2),
    }));
  };

  // Input Handlers
  const handleEmiInputChange = (
    field: keyof Omit<EmiData, "result">,
    value: string,
  ) => {
    setEmiData((prev) => ({
      ...prev,
      [field]: value,
      result: null,
    }));
  };

  const handleAreaInputChange = (field: keyof Dimensions, value: string) => {
    setAreaData((prev) => ({
      ...prev,
      dimensions: {
        ...prev.dimensions,
        [field]: parseFloat(value) || 0,
      },
      result: null,
    }));
  };

  const handleShapeChange = (shape: Shape) => {
    setAreaData({
      shape,
      dimensions: {},
      result: null,
    });
  };

  // Render Area Inputs
  const renderAreaInputs = () => {
    const { shape, dimensions } = areaData;

    switch (shape) {
      case "rectangle":
        return (
          <>
            <input
              type="number"
              placeholder="Length"
              className="no-drag w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 bg-white"
              value={dimensions.length ?? ""}
              onChange={(e) => handleAreaInputChange("length", e.target.value)}
            />
            <input
              type="number"
              placeholder="Width"
              className="no-drag w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 bg-white"
              value={dimensions.width ?? ""}
              onChange={(e) => handleAreaInputChange("width", e.target.value)}
            />
          </>
        );
      case "circle":
        return (
          <input
            type="number"
            placeholder="Radius"
            className="no-drag w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 bg-white"
            value={dimensions.radius ?? ""}
            onChange={(e) => handleAreaInputChange("radius", e.target.value)}
          />
        );
      case "triangle":
        return (
          <>
            <input
              type="number"
              placeholder="Base"
              className="no-drag w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 bg-white"
              value={dimensions.base ?? ""}
              onChange={(e) => handleAreaInputChange("base", e.target.value)}
            />
            <input
              type="number"
              placeholder="Height"
              className="no-drag w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 bg-white"
              value={dimensions.height ?? ""}
              onChange={(e) => handleAreaInputChange("height", e.target.value)}
            />
          </>
        );
      case "square":
        return (
          <input
            type="number"
            placeholder="Side Length"
            className="no-drag w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 bg-white"
            value={dimensions.side ?? ""}
            onChange={(e) => handleAreaInputChange("side", e.target.value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={calculatorRef}
      className={`fixed bg-white rounded-xl shadow-2xl border border-gray-200 transition-all duration-200 select-none z-50 w-96 h-auto ${isDragging ? "shadow-3xl scale-105" : ""}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? "grabbing" : "grab",
        transform: isDragging ? "rotate(2deg)" : "rotate(0deg)",
        transition: isDragging ? "none" : "transform 0.2s ease-out",
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-blue-600 rounded-t-xl text-white shadow-lg">
        <div className="flex items-center space-x-2">
          <Calculator className="h-5 w-5" />
          <h2 className="font-semibold">JGRT Calculator</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Move className="h-4 w-4 opacity-70" />
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="no-drag p-1 hover:bg-white hover:bg-opacity-20 rounded"
          >
            <Minus className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="p-4">
        {/* Tabs */}
        <div className="flex mb-4 bg-blue-50 rounded-lg p-1 border border-blue-100">
          <button
            onClick={() => setActiveTab("emi")}
            className={`no-drag flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              activeTab === "emi"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-blue-700 hover:text-blue-800 hover:bg-blue-100"
            }`}
          >
            <DollarSign className="h-4 w-4 inline mr-1" />
            EMI Calculator
          </button>
          <button
            onClick={() => setActiveTab("area")}
            className={`no-drag flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              activeTab === "area"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-blue-700 hover:text-blue-800 hover:bg-blue-100"
            }`}
          >
            <Square className="h-4 w-4 inline mr-1" />
            Area Calculator
          </button>
        </div>

        {/* EMI Calculator */}
        {activeTab === "emi" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Principal Amount (₹)
              </label>
              <input
                type="number"
                placeholder="Enter loan amount"
                className="no-drag w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 bg-white"
                value={emiData.principal}
                onChange={(e) =>
                  handleEmiInputChange("principal", e.target.value)
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interest Rate (% per annum)
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="Enter interest rate"
                className="no-drag w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 bg-white"
                value={emiData.rate}
                onChange={(e) => handleEmiInputChange("rate", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tenure (Years)
              </label>
              <input
                type="number"
                placeholder="Enter tenure in years"
                className="no-drag w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 bg-white"
                value={emiData.tenure}
                onChange={(e) => handleEmiInputChange("tenure", e.target.value)}
              />
            </div>

            <button
              onClick={calculateEMI}
              className="no-drag w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Calculate EMI
            </button>

            {emiData.result && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">
                  EMI Calculation Results:
                </h3>
                <div className="space-y-2 text-sm text-blue-700">
                  <div className="flex justify-between">
                    <span>Monthly EMI:</span>
                    <span className="font-semibold text-blue-800">
                      ₹{emiData.result.emi}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Amount:</span>
                    <span className="font-semibold text-blue-800">
                      ₹{emiData.result.totalAmount}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Interest:</span>
                    <span className="font-semibold text-blue-800">
                      ₹{emiData.result.totalInterest}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Area Calculator */}
        {activeTab === "area" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Shape
              </label>
              <select
                value={areaData.shape}
                onChange={(e) => handleShapeChange(e.target.value as Shape)}
                className="no-drag w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 bg-white"
              >
                <option value="rectangle">Rectangle</option>
                <option value="square">Square</option>
                <option value="circle">Circle</option>
                <option value="triangle">Triangle</option>
              </select>
            </div>

            <div className="space-y-3">{renderAreaInputs()}</div>

            <button
              onClick={calculateArea}
              className="no-drag w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Calculate Area
            </button>

            {areaData.result && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">
                  Area Calculation Result:
                </h3>
                <div className="text-lg font-semibold text-blue-800">
                  Area: {areaData.result} square units
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}